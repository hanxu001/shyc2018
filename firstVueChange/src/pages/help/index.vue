<template>
  <div class="k-line-area bg-1d1d29">
    <div id="tv_chart_container"></div>
  </div>
</template>
<script>
  import Datafeeds from "assets/js/datafeed";

  const TradingView = require("static/charting_library/charting_library.min");

  export default {
    name: "DKLine",
    data: function() {
      return {
        id: "DKLine",
        chart: null,
        currentSymbol: null
      };
    },
    methods: {
      createChart() {
        this.chart = new window.TradingView.widget({
          fullscreen: true,
          symbol: 'Btc',
          interval: "15",
          hide_side_toolbar: true,
          container_id: "tv_chart_container",
          timezone: 'Asia/Shanghai',
          //	BEWARE: no trailing slash is expected in feed URL
          datafeed: new Datafeeds.UDFCompatibleDatafeed("https://demo_feed.tradingview.com"),
          // datafeed: new Datafeeds.UDFCompatibleDatafeed("http://otc.com/tv/table"),
          library_path: "static/charting_library/",
          locale: "zh",
          //	Regression Trend-related functionality is not implemented yet, so it's hidden for a while
          drawings_access: {
            type: 'white',
            tools: [{
              name: "Regression Trend"
            }]
          },
          disabled_features: [
            // "edit_buttons_in_legend",
            // "display_market_status",
            // "header_chart_type",
            // "header_settings",
            // "header_fullscreen_button",
            // "header_indicators",
            "use_localstorage_for_settings",
            "header_compare",
            "header_symbol_search",
            "symbol_info",
            "symbol_search_hot_key",
            "compare_symbol",
            "border_around_the_chart",
            "header_interval_dialog_button",
            "show_interval_dialog_on_key_press",
            "remove_library_container_border",
            "left_toolbar",
            "header_undo_redo",
            "header_screenshot",
            "header_saveload",
            "timeframes_toolbar",
            "volume_force_overlay",
            "context_menus"
          ],
          studies_overrides: {
            "volume.volume.color.0": "#d75442",
            "volume.volume.color.1": "#6ba583",
            "volume.volume.transparency": 65,
            "volume.show ma": false
          },
          overrides: {
            "paneProperties.background": "#fff",
            "symbolWatermarkProperties.color": "rgba(0, 0, 0, 0)",
            "mainSeriesProperties.style": 1,
            "paneProperties.vertGridProperties.color": "#fff",
            "paneProperties.horzGridProperties.color": "#fff",
            "paneProperties.crossHairProperties.color": "#666",
            "mainSeriesProperties.candleStyle.drawBorder": false,
            "volumePaneSize": "small"
          },
          save_image: false
        });
      },
      refresh() {
        if (!window.TradingView) {
          console.log("Waiting for TV");
          setTimeout(() => {
            this.refresh();
          }, 2000);
          return;
        }
        if (!this.chart || this.symbol != this.currentSymbol) {
          this.createChart();
        }
      }
    },
    computed: {
      symbol() {
        return `AAPL`;
      }
    },
    mounted() {
      this.refresh();
    },
    watch: {
      symbol() {
        this.refresh();
      }
    }
  };
</script>
<style scoped>
</style>
