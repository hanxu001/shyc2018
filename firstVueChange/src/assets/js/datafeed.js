'use strict';
/*
 This class implements interaction with UDF-compatible datafeed.

 See UDF protocol reference at
 https://github.com/tradingview/charting_library/wiki/UDF
 */

var Datafeeds = {};
var hash = {
  "W":7*86400,
  "M":30*86400,
  "D":86400,
  "1":60,
  "5":300,
  "15":15*60,
  "30":30*60,
  "60":60*60,
  "120":120*60,
  "240":240*60,
  "360":360*60,
  "480":480*60,
  "720":720*60
}
Datafeeds.UDFCompatibleDatafeed = function (locale, updateFrequency) {
  console.log(1);
  this._locale = locale;
  this._configuration = undefined;

  this._symbolSearch = null;
  this._symbolsStorage = null;
  this._barsPulseUpdater = new Datafeeds.DataPulseUpdater(this, updateFrequency || 10 * 1000);
  //this._quotesPulseUpdater = new Datafeeds.QuotesPulseUpdater(this);

  this._enableLogging = true;
  this._initializationFinished = false;
  this._callbacks = {};
  this._currentSubscriptionRecord = null;
  this._socket = null;

  this._initialize();
};

Datafeeds.UDFCompatibleDatafeed.prototype.defaultConfiguration = function () {
  console.log(2);
  return {
    supports_search: false,
    supports_group_request: true,
    supported_resolutions: ['1', '5', '15', '30', '60', '1D', '1W', '1M'],
    supports_marks: false,
    supports_timescale_marks: false
  };
};

Datafeeds.UDFCompatibleDatafeed.prototype.getServerTime = function (callback) {
  console.log(3);
  if (this._configuration.supports_time) {

    this._send({
      method: "server.time",
      params: []
    }, function (res) {
      if (!res.error) {
        callback(res.result);
      }
    })
    // this._send(this._datafeedURL + '/time', {})
    // 	.done(function(response) {
    // 		callback(+response);
    // 	})
    // 	.fail(function() {
    // 	});
  }
};

Datafeeds.UDFCompatibleDatafeed.prototype.on = function (event, callback) {
  console.log(4);
  if (!this._callbacks.hasOwnProperty(event)) {
    this._callbacks[event] = [];
  }

  this._callbacks[event].push(callback);
  return this;
};

Datafeeds.UDFCompatibleDatafeed.prototype._fireEvent = function (event, argument) {
  console.log(5);
  if (this._callbacks.hasOwnProperty(event)) {
    var callbacksChain = this._callbacks[event];
    for (var i = 0; i < callbacksChain.length; ++i) {
      callbacksChain[i](argument);
    }

    this._callbacks[event] = [];
  }
};

Datafeeds.UDFCompatibleDatafeed.prototype.onInitialized = function () {
  console.log(6);
  this._initializationFinished = true;
  this._fireEvent('initialized');
};

Datafeeds.UDFCompatibleDatafeed.prototype._logMessage = function (message) {
  if (this._enableLogging) {
    var now = new Date();
    console.log(now.toLocaleTimeString() + '.' + now.getMilliseconds() + '> ' + message);
  }
};

Datafeeds.UDFCompatibleDatafeed.prototype._send = function (url, params, callback) {
  console.log(7);
  var request = url;
  var ws = new WebSocket(request);

  ws.onopen = function (evt) {
    ws.send(JSON.stringify(params));
    // ws.send("{'event':'k_line','channel':'ticker'}");
  }
  ws.onmessage = function (res) {
    callback(res.data);
  }
};

Datafeeds.UDFCompatibleDatafeed.prototype._initialize = function () {
  var that = this;

  this._setupWithConfiguration({
    "supports_search": true,
    "supports_group_request": false,
    "supports_marks": false,
    "supports_timescale_marks": false,
    "supports_time": false,
    "exchanges": [
      {"value": "weex", "name": "weex", "desc": "weex exchange"}
    ],
    "symbolsTypes": [{"name": "bitcoin", "value": "bitcoin"}],
    "supportedResolutions": ["1", "5", "15", "30", "60", "120", "240", "360", "720", "D", "W", "M"]
  })

  // this._send(this._datafeedURL + '/config')
  // 	.done(function(response) {
  // 		var configurationData = JSON.parse(response);
  // 		that._setupWithConfiguration(configurationData);
  // 	})
  // 	.fail(function(reason) {
  // 		that._setupWithConfiguration(that.defaultConfiguration());
  // 	});
};

Datafeeds.UDFCompatibleDatafeed.prototype.onReady = function (callback) {
  console.log(9);
  var that = this;
  if (this._configuration) {
    setTimeout(function () {
      callback(that._configuration);
    }, 0);
  } else {
    this.on('configuration_ready', function () {
      callback(that._configuration);
    });
  }
};

Datafeeds.UDFCompatibleDatafeed.prototype._setupWithConfiguration = function (configurationData) {
  console.log(10);
  this._configuration = configurationData;

  if (!configurationData.exchanges) {
    configurationData.exchanges = [];
  }

  //	@obsolete; remove in 1.5
  var supportedResolutions = configurationData.supported_resolutions || configurationData.supportedResolutions;
  configurationData.supported_resolutions = supportedResolutions;

  //	@obsolete; remove in 1.5
  var symbolsTypes = configurationData.symbols_types || configurationData.symbolsTypes;
  configurationData.symbols_types = symbolsTypes;

  if (!configurationData.supports_search && !configurationData.supports_group_request) {
    throw new Error('Unsupported datafeed configuration. Must either support search, or support group request');
  }

  if (!configurationData.supports_search) {
    this._symbolSearch = new Datafeeds.SymbolSearchComponent(this);
  }

  if (configurationData.supports_group_request) {
    //	this component will call onInitialized() by itself
    this._symbolsStorage = new Datafeeds.SymbolsStorage(this);
  } else {
    this.onInitialized();
  }

  this._fireEvent('configuration_ready');
  this._logMessage('Initialized with ' + JSON.stringify(configurationData));
};

//	===============================================================================================================================
//	The functions set below is the implementation of JavaScript API.

Datafeeds.UDFCompatibleDatafeed.prototype.getMarks = function (symbolInfo, rangeStart, rangeEnd, onDataCallback, resolution) {
  // if (this._configuration.supports_marks) {
  // 	this._send(this._datafeedURL + '/marks', {
  // 		symbol: symbolInfo.ticker.toUpperCase(),
  // 		from: rangeStart,
  // 		to: rangeEnd,
  // 		resolution: resolution
  // 	})
  // 		.done(function(response) {
  // 			onDataCallback(JSON.parse(response));
  // 		})
  // 		.fail(function() {
  // 			onDataCallback([]);
  // 		});
  // }
};

Datafeeds.UDFCompatibleDatafeed.prototype.getTimescaleMarks = function (symbolInfo, rangeStart, rangeEnd, onDataCallback, resolution) {
  // if (this._configuration.supports_timescale_marks) {
  // 	this._send(this._datafeedURL + '/timescale_marks', {
  // 		symbol: symbolInfo.ticker.toUpperCase(),
  // 		from: rangeStart,
  // 		to: rangeEnd,
  // 		resolution: resolution
  // 	})
  // 		.done(function(response) {
  // 			onDataCallback(JSON.parse(response));
  // 		})
  // 		.fail(function() {
  // 			onDataCallback([]);
  // 		});
  // }
};

Datafeeds.UDFCompatibleDatafeed.prototype._symbolResolveURL = '/symbols';

//	BEWARE: this function does not consider symbol's exchange

Datafeeds.UDFCompatibleDatafeed.prototype.resolveSymbol = function (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {
  var that = this;

  if (!this._initializationFinished) {
    this.on('initialized', function () {
      that.resolveSymbol(symbolName, onSymbolResolvedCallback, onResolveErrorCallback);
    });

    return;
  }

  var resolveRequestStartTime = Date.now();
  that._logMessage('Resolve requested');

  function onResultReady(data) {
    var postProcessedData = data;
    if (that.postProcessSymbolInfo) {
      postProcessedData = that.postProcessSymbolInfo(postProcessedData);
    }

    that._logMessage('Symbol resolved: ' + (Date.now() - resolveRequestStartTime));

    onSymbolResolvedCallback(postProcessedData);
  }

  if (!this._configuration.supports_group_request) {
    setTimeout(function () {
      var dest = /dest=(.*?)($|&)/.exec(location.search)
      if (dest && dest.length) {
        dest = dest[1]
      }
      var currency = /currency=(.*?)($|&)/.exec(location.search)
      if (currency && currency.length) {
        currency = currency[1]
      }

      onResultReady({
        name: "BTC",
        market: "BTC/USD",
        "exchange-traded": "",
        "exchange-listed": "",
        timezone: "Asia/Shanghai",
        minmov: 1,
        minmov2: 0,
        pricescale: 100,
        pointvalue: 1,
        fractional: false,
        session: "24x7",
        has_intraday: true,
        has_no_volume: false,
        ticker: "BTC",
        description: "BTC/USD",
        type: "bitcoin",
        supported_resolutions: [
          "1",
          "5",
          "15",
          "30",
          "60",
          "120",
          "240",
          "360",
          "720",
          "D",
          "W",
          "M"
        ]
      })
    }, 1)
    // this._send(this._datafeedURL + this._symbolResolveURL, {
    // 	symbol: symbolName ? symbolName.toUpperCase() : ''
    // })
    // 	.done(function(response) {
    // 		var data = JSON.parse(response);
    //
    // 		if (data.s && data.s !== 'ok') {
    // 			onResolveErrorCallback('unknown_symbol');
    // 		} else {
    // 			onResultReady(data);
    // 		}
    // 	})
    // 	.fail(function(reason) {
    // 		that._logMessage('Error resolving symbol: ' + JSON.stringify([reason]));
    // 		onResolveErrorCallback('unknown_symbol');
    // 	});
  } else {
    if (this._initializationFinished) {
      this._symbolsStorage.resolveSymbol(symbolName, onResultReady, onResolveErrorCallback);
    } else {
      this.on('initialized', function () {
        that._symbolsStorage.resolveSymbol(symbolName, onResultReady, onResolveErrorCallback);
      });
    }
  }
};

Datafeeds.UDFCompatibleDatafeed.prototype._historyURL = '/history';

Datafeeds.UDFCompatibleDatafeed.prototype.getBars = function (symbolInfo, resolution, rangeStartDate, rangeEndDate, onDataCallback, onErrorCallback) {
  //	timestamp sample: 1399939200
  //debugger
  if (rangeStartDate > 0 && (rangeStartDate + '').length > 10) {
    throw new Error(['Got a JS time instead of Unix one.', rangeStartDate, rangeEndDate]);
  }

  // this._send(this._datafeedURL + this._historyURL, {
  // 	symbol: symbolInfo.ticker.toUpperCase(),
  // 	resolution: resolution,
  // 	from: rangeStartDate,
  // 	to: rangeEndDate
  // })

  //debugger
  var _this = this;
  if (!this._isGettingBar) {
    this._isGettingBar = true;
    var params = {"method": "kline.query",
      "params":[symbolInfo.market,rangeStartDate,rangeEndDate,hash[resolution]]};
    this._send("ws://192.168.1.19:9501", params, function (response) {

      var res = JSON.parse(response);
      if(!res.error){
        //debugger
        _this._isGettingBar = false
        var data = res.result
        var nodata = data.length===0;
        var bars = [];

        //	data is JSON having format {s: "status" (ok, no_data, error),
        //  v: [volumes], t: [times], o: [opens], h: [highs], l: [lows], c:[closes], nb: "optional_unixtime_if_no_data"}
        var barsCount = nodata ? 0 : data.length;

        if(!nodata){
          _this.cachedKlines = data
        }

        var volumePresent = true;
        var ohlPresent = true;

        for (var i = 0; i < barsCount; ++i) {
          var barValue = {
            time: data[i][0] * 1000,
            close: data[i][2] * 1
          };

          if (ohlPresent) {
            barValue.open = data[i][1]*1;
            barValue.high = data[i][3]*1;
            barValue.low = data[i][4]*1;
          } else {
            barValue.open = barValue.high = barValue.low = barValue.close;
          }

          if (volumePresent) {
            barValue.volume = data[i][5]*1;
          }

          bars.push(barValue);
        }
        //debugger
        onDataCallback(bars, { noData: nodata, nextTime: data.nb || data.nextTime });
      }
      else{
        if (!!onErrorCallback) {
          onErrorCallback(res.error);
        }
        return;
      }
    });

  }
};

Datafeeds.UDFCompatibleDatafeed.prototype.subscribeBars = function (symbolInfo, resolution, onRealtimeCallback, listenerGUID, onResetCacheNeededCallback) {
  // alert('subscribeBars:  '+listenerGUID);
  this._barsPulseUpdater.subscribeDataListener(symbolInfo, resolution, onRealtimeCallback, listenerGUID, onResetCacheNeededCallback);
};

Datafeeds.UDFCompatibleDatafeed.prototype.unsubscribeBars = function (listenerGUID) {
  // alert('unsubscribeBars:  '+listenerGUID);
  this._barsPulseUpdater.unsubscribeDataListener(listenerGUID);
};

Datafeeds.UDFCompatibleDatafeed.prototype.calculateHistoryDepth = function (period, resolutionBack, intervalBack) {
};

// Datafeeds.UDFCompatibleDatafeed.prototype.getQuotes = function (symbols, onDataCallback, onErrorCallback) {
//     this._send(this._datafeedURL + '/quotes', {symbols: symbols})
//         .done(function (response) {
//             var data = JSON.parse(response);
//             if (data.s === 'ok') {
//                 //	JSON format is {s: "status", [{s: "symbol_status", n: "symbol_name", v: {"field1": "value1", "field2": "value2", ..., "fieldN": "valueN"}}]}
//                 if (onDataCallback) {
//                     onDataCallback(data.d);
//                 }
//             } else {
//                 if (onErrorCallback) {
//                     onErrorCallback(data.errmsg);
//                 }
//             }
//         })
//         .fail(function (arg) {
//             if (onErrorCallback) {
//                 onErrorCallback('network error: ' + arg);
//             }
//         });
// };

// Datafeeds.UDFCompatibleDatafeed.prototype.subscribeQuotes = function (symbols, fastSymbols, onRealtimeCallback, listenerGUID) {
//     this._quotesPulseUpdater.subscribeDataListener(symbols, fastSymbols, onRealtimeCallback, listenerGUID);
// };
//
// Datafeeds.UDFCompatibleDatafeed.prototype.unsubscribeQuotes = function (listenerGUID) {
//     this._quotesPulseUpdater.unsubscribeDataListener(listenerGUID);
// };

//	==================================================================================================================================================
//	==================================================================================================================================================
//	==================================================================================================================================================

/*
 It's a symbol storage component for ExternalDatafeed. This component can
 * interact to UDF-compatible datafeed which supports whole group info requesting
 * do symbol resolving -- return symbol info by its name
 */
// Datafeeds.SymbolsStorage = function (datafeed) {
//     this._datafeed = datafeed;
//
//     this._exchangesList = ['NYSE', 'FOREX', 'AMEX'];
//     this._exchangesWaitingForData = {};
//     this._exchangesDataCache = {};
//
//     this._symbolsInfo = {};
//     this._symbolsList = [];
//
//     this._requestFullSymbolsList();
// };
//
// Datafeeds.SymbolsStorage.prototype._requestFullSymbolsList = function () {
//     var that = this;
//
//     for (var i = 0; i < this._exchangesList.length; ++i) {
//         var exchange = this._exchangesList[i];
//
//         if (this._exchangesDataCache.hasOwnProperty(exchange)) {
//             continue;
//         }
//
//         this._exchangesDataCache[exchange] = true;
//
//         this._exchangesWaitingForData[exchange] = 'waiting_for_data';
//
//         this._datafeed._send(this._datafeed._datafeedURL + '/symbol_info', {
//             group: exchange
//         })
//             .done((function (exchange) {
//                 return function (response) {
//                     that._onExchangeDataReceived(exchange, JSON.parse(response));
//                     that._onAnyExchangeResponseReceived(exchange);
//                 };
//             })(exchange))
//             .fail((function (exchange) {
//                 return function (reason) {
//                     that._onAnyExchangeResponseReceived(exchange);
//                 };
//             })(exchange));
//     }
// };
//
// Datafeeds.SymbolsStorage.prototype._onExchangeDataReceived = function (exchangeName, data) {
//     function tableField(data, name, index) {
//         return data[name] instanceof Array ?
//             data[name][index] :
//             data[name];
//     }
//
//     try {
//         for (var symbolIndex = 0; symbolIndex < data.symbol.length; ++symbolIndex) {
//             var symbolName = data.symbol[symbolIndex];
//             var listedExchange = tableField(data, 'exchange-listed', symbolIndex);
//             var tradedExchange = tableField(data, 'exchange-traded', symbolIndex);
//             var fullName = tradedExchange + ':' + symbolName;
//
//             //	This feature support is not implemented yet
//             //	var hasDWM = tableField(data, "has-dwm", symbolIndex);
//
//             var hasIntraday = tableField(data, 'has-intraday', symbolIndex);
//
//             var tickerPresent = typeof data.ticker != 'undefined';
//
//             var symbolInfo = {
//                 name: symbolName,
//                 base_name: [listedExchange + ':' + symbolName],
//                 description: tableField(data, 'description', symbolIndex),
//                 full_name: fullName,
//                 legs: [fullName],
//                 has_intraday: hasIntraday,
//                 has_no_volume: tableField(data, 'has-no-volume', symbolIndex),
//                 listed_exchange: listedExchange,
//                 exchange: tradedExchange,
//                 minmov: tableField(data, 'minmovement', symbolIndex) || tableField(data, 'minmov', symbolIndex),
//                 minmove2: tableField(data, 'minmove2', symbolIndex) || tableField(data, 'minmov2', symbolIndex),
//                 fractional: tableField(data, 'fractional', symbolIndex),
//                 pointvalue: tableField(data, 'pointvalue', symbolIndex),
//                 pricescale: tableField(data, 'pricescale', symbolIndex),
//                 type: tableField(data, 'type', symbolIndex),
//                 session: tableField(data, 'session-regular', symbolIndex),
//                 ticker: tickerPresent ? tableField(data, 'ticker', symbolIndex) : symbolName,
//                 timezone: tableField(data, 'timezone', symbolIndex),
//                 supported_resolutions: tableField(data, 'supported-resolutions', symbolIndex) || this._datafeed.defaultConfiguration().supported_resolutions,
//                 force_session_rebuild: tableField(data, 'force-session-rebuild', symbolIndex) || false,
//                 has_daily: tableField(data, 'has-daily', symbolIndex) || true,
//                 intraday_multipliers: tableField(data, 'intraday-multipliers', symbolIndex) || ['1', '5', '15', '30', '60'],
//                 has_fractional_volume: tableField(data, 'has-fractional-volume', symbolIndex) || false,
//                 has_weekly_and_monthly: tableField(data, 'has-weekly-and-monthly', symbolIndex) || false,
//                 has_empty_bars: tableField(data, 'has-empty-bars', symbolIndex) || false,
//                 volume_precision: tableField(data, 'volume-precision', symbolIndex) || 0
//             };
//
//             this._symbolsInfo[symbolInfo.ticker] = this._symbolsInfo[symbolName] = this._symbolsInfo[fullName] = symbolInfo;
//             this._symbolsList.push(symbolName);
//         }
//     } catch (error) {
//         throw new Error('API error when processing exchange `' + exchangeName + '` symbol #' + symbolIndex + ': ' + error);
//     }
// };
//
// Datafeeds.SymbolsStorage.prototype._onAnyExchangeResponseReceived = function (exchangeName) {
//     delete this._exchangesWaitingForData[exchangeName];
//
//     var allDataReady = Object.keys(this._exchangesWaitingForData).length === 0;
//
//     if (allDataReady) {
//         this._symbolsList.sort();
//         this._datafeed._logMessage('All exchanges data ready');
//         this._datafeed.onInitialized();
//     }
// };
//
// //	BEWARE: this function does not consider symbol's exchange
// Datafeeds.SymbolsStorage.prototype.resolveSymbol = function (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {
//     var that = this;
//
//     setTimeout(function () {
//         if (!that._symbolsInfo.hasOwnProperty(symbolName)) {
//             onResolveErrorCallback('invalid symbol');
//         } else {
//             onSymbolResolvedCallback(that._symbolsInfo[symbolName]);
//         }
//     }, 0);
// };

//	==================================================================================================================================================
//	==================================================================================================================================================
//	==================================================================================================================================================

/*
 It's a symbol search component for ExternalDatafeed. This component can do symbol search only.
 This component strongly depends on SymbolsDataStorage and cannot work without it. Maybe, it would be
 better to merge it to SymbolsDataStorage.
 */

// Datafeeds.SymbolSearchComponent = function (datafeed) {
//     this._datafeed = datafeed;
// };
//
// //	searchArgument = { searchString, onResultReadyCallback}
// Datafeeds.SymbolSearchComponent.prototype.searchSymbols = function (searchArgument, maxSearchResults) {
//     if (!this._datafeed._symbolsStorage) {
//         throw new Error('Cannot use local symbol search when no groups information is available');
//     }
//
//     var symbolsStorage = this._datafeed._symbolsStorage;
//
//     var results = []; // array of WeightedItem { item, weight }
//     var queryIsEmpty = !searchArgument.searchString || searchArgument.searchString.length === 0;
//     var searchStringUpperCase = searchArgument.searchString.toUpperCase();
//
//     for (var i = 0; i < symbolsStorage._symbolsList.length; ++i) {
//         var symbolName = symbolsStorage._symbolsList[i];
//         var item = symbolsStorage._symbolsInfo[symbolName];
//
//         if (searchArgument.type && searchArgument.type.length > 0 && item.type !== searchArgument.type) {
//             continue;
//         }
//
//         if (searchArgument.exchange && searchArgument.exchange.length > 0 && item.exchange !== searchArgument.exchange) {
//             continue;
//         }
//
//         var positionInName = item.name.toUpperCase().indexOf(searchStringUpperCase);
//         var positionInDescription = item.description.toUpperCase().indexOf(searchStringUpperCase);
//
//         if (queryIsEmpty || positionInName >= 0 || positionInDescription >= 0) {
//             var found = false;
//             for (var resultIndex = 0; resultIndex < results.length; resultIndex++) {
//                 if (results[resultIndex].item === item) {
//                     found = true;
//                     break;
//                 }
//             }
//
//             if (!found) {
//                 var weight = positionInName >= 0 ? positionInName : 8000 + positionInDescription;
//                 results.push({item: item, weight: weight});
//             }
//         }
//     }
//
//     searchArgument.onResultReadyCallback(
//         results
//             .sort(function (weightedItem1, weightedItem2) {
//                 return weightedItem1.weight - weightedItem2.weight;
//             })
//             .map(function (weightedItem) {
//                 var item = weightedItem.item;
//                 return {
//                     symbol: item.name,
//                     full_name: item.full_name,
//                     description: item.description,
//                     exchange: item.exchange,
//                     params: [],
//                     type: item.type,
//                     ticker: item.name
//                 };
//             })
//             .slice(0, Math.min(results.length, maxSearchResults))
//     );
// };

//	==================================================================================================================================================
//	==================================================================================================================================================
//	==================================================================================================================================================

/*
 This is a pulse updating components for ExternalDatafeed. They emulates realtime updates with periodic requests.
 */

Datafeeds.DataPulseUpdater = function (datafeed, updateFrequency) {
  //debugger
  this._datafeed = datafeed;
  this._subscribers = {};

  this._requestsPending = 0;
  var that = this;

  var update = function () {
    if (that._requestsPending > 0) {
      return;
    }

    // var hasSubscribe = false
    for (var listenerGUID in that._subscribers) {
      //hasSubscribe = true
      var subscriptionRecord = that._subscribers[listenerGUID];
      var resolution = subscriptionRecord.resolution;
      if (this._currentSubscriptionRecord != subscriptionRecord) {
        this._currentSubscriptionRecord = subscriptionRecord;

        (function (_subscriptionRecord) { // eslint-disable-line
          that._requestsPending++;
          var param = {
            method: "kline.subscribe",
            params:[_subscriptionRecord.symbolInfo.market, hash[resolution]]
          }
          that._datafeed._send('ws://192.168.1.19:9501', param, function (res) {
            var res = JSON.parse(res);
            if (!res.error) {
              that._requestsPending--;

              if (res.method) {
                var bars = res.params;
                //	means the subscription was cancelled while waiting for data
                if (!that._subscribers.hasOwnProperty(listenerGUID)) {
                  return;
                }

                if (bars.length === 0) {
                  return;
                }

                var data = bars[bars.length - 1];

                var lastBar = {
                  time: data[0] * 1000,
                  close: data[2] * 1
                };
                lastBar.open = data[1] * 1;
                lastBar.high = data[3] * 1;
                lastBar.low = data[4] * 1;
                lastBar.volume = data[5] * 1;


                if (!isNaN(_subscriptionRecord.lastBarTime) && lastBar.time < _subscriptionRecord.lastBarTime) {
                  return;
                }

                var subscribers = _subscriptionRecord.listeners;

                //	BEWARE: this one isn't working when first update comes and this update makes a new bar. In this case
                //	_subscriptionRecord.lastBarTime = NaN
                var isNewBar = !isNaN(_subscriptionRecord.lastBarTime) && lastBar.time > _subscriptionRecord.lastBarTime;


                //	Pulse updating may miss some trades data (ie, if pulse period = 10 secods and new bar is started 5 seconds later after the last update, the
                //	old bar's last 5 seconds trades will be lost). Thus, at fist we should broadcast old bar updates when it's ready.
                // if (isNewBar) {
                // 	if (bars.length < 2) {
                // 		throw new Error('Not enough bars in history for proper pulse update. Need at least 2.');
                // 	}

                // 	var previousBar = bars[bars.length - 2];
                // 	for (var i = 0; i < subscribers.length; ++i) {
                // 		subscribers[i](previousBar);
                // 	}
                // }

                _subscriptionRecord.lastBarTime = lastBar.time;

                for (var i = 0; i < subscribers.length; ++i) {
                  subscribers[i](lastBar);
                }
              }
              else {
                //console.log("kline订阅成功")
              }
            } else {
              console.error(res.error)
            }
          })
        })(subscriptionRecord);
      }
      else {
        //已订阅，不重复订阅
      }
    }

    // if(hasSubscribe){
    // 	clearInterval(interval)
    // }
  };
  var interval = setInterval(update, updateFrequency);
  // if (typeof updateFrequency != 'undefined' && updateFrequency > 0) {
  // 	setInterval(update, updateFrequency);
  // }
};

Datafeeds.DataPulseUpdater.prototype.unsubscribeDataListener = function (listenerGUID) {
  // alert('unsubscribeDataListener');
  this._datafeed._logMessage('Unsubscribing ' + listenerGUID);
  delete this._subscribers[listenerGUID];
};

Datafeeds.DataPulseUpdater.prototype.subscribeDataListener = function (symbolInfo, resolution, newDataCallback, listenerGUID) {
  // alert('subscribeDataListener');
  this._datafeed._logMessage('Subscribing ' + listenerGUID);

  if (!this._subscribers.hasOwnProperty(listenerGUID)) {
    this._subscribers[listenerGUID] = {
      symbolInfo: symbolInfo,
      resolution: resolution,
      lastBarTime: NaN,
      listeners: []
    };
  }

  this._subscribers[listenerGUID].listeners.push(newDataCallback);
};

Datafeeds.DataPulseUpdater.prototype.periodLengthSeconds = function (resolution, requiredPeriodsCount) {
  var daysCount = 0;

  if (resolution === 'D') {
    daysCount = requiredPeriodsCount;
  } else if (resolution === 'M') {
    daysCount = 31 * requiredPeriodsCount;
  } else if (resolution === 'W') {
    daysCount = 7 * requiredPeriodsCount;
  } else {
    daysCount = requiredPeriodsCount * resolution / (24 * 60);
  }

  return daysCount * 24 * 60 * 60;
};

// Datafeeds.QuotesPulseUpdater = function (datafeed) {
//     this._datafeed = datafeed;
//     this._subscribers = {};
//     this._updateInterval = 60 * 1000;
//     this._fastUpdateInterval = 10 * 1000;
//     this._requestsPending = 0;
//
//     var that = this;
//
//     setInterval(function () {
//         that._updateQuotes(function (subscriptionRecord) {
//             return subscriptionRecord.symbols;
//         });
//     }, this._updateInterval);
//
//     setInterval(function () {
//         that._updateQuotes(function (subscriptionRecord) {
//             return subscriptionRecord.fastSymbols.length > 0 ? subscriptionRecord.fastSymbols : subscriptionRecord.symbols;
//         });
//     }, this._fastUpdateInterval);
// };
//
// Datafeeds.QuotesPulseUpdater.prototype.subscribeDataListener = function (symbols, fastSymbols, newDataCallback, listenerGUID) {
//     if (!this._subscribers.hasOwnProperty(listenerGUID)) {
//         this._subscribers[listenerGUID] = {
//             symbols: symbols,
//             fastSymbols: fastSymbols,
//             listeners: []
//         };
//     }
//
//     this._subscribers[listenerGUID].listeners.push(newDataCallback);
// };
//
// Datafeeds.QuotesPulseUpdater.prototype.unsubscribeDataListener = function (listenerGUID) {
//     delete this._subscribers[listenerGUID];
// };
//
// Datafeeds.QuotesPulseUpdater.prototype._updateQuotes = function (symbolsGetter) {
//     if (this._requestsPending > 0) {
//         return;
//     }
//
//     var that = this;
//     for (var listenerGUID in this._subscribers) {
//         this._requestsPending++;
//
//         var subscriptionRecord = this._subscribers[listenerGUID];
//         this._datafeed.getQuotes(symbolsGetter(subscriptionRecord),
//
//             // onDataCallback
//             (function (subscribers, guid) { // eslint-disable-line
//                 return function (data) {
//                     that._requestsPending--;
//
//                     // means the subscription was cancelled while waiting for data
//                     if (!that._subscribers.hasOwnProperty(guid)) {
//                         return;
//                     }
//
//                     for (var i = 0; i < subscribers.length; ++i) {
//                         subscribers[i](data);
//                     }
//                 };
//             }(subscriptionRecord.listeners, listenerGUID)),
//             // onErrorCallback
//             function (error) {
//                 that._requestsPending--;
//             });
//     }
// };
//
export default {
  UDFCompatibleDatafeed: Datafeeds.UDFCompatibleDatafeed
};
