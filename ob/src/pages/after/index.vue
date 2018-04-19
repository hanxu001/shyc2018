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
          symbol: "AAPL",
          interval: "D",
          container_id: "tv_chart_container",
          //	BEWARE: no trailing slash is expected in feed URL
          // "http://localhost:3030"
          datafeed: new Datafeeds.UDFCompatibleDatafeed(
            "https://demo_feed.tradingview.com"
          ),
          library_path: "./static/charting_library/",
          locale: "zh",
          //	Regression Trend-related functionality is not implemented yet, so it's hidden for a while
          drawings_access: {
            type: "black",
            tools: [{ name: "Regression Trend" }]
          },
          disabled_features: ["use_localstorage_for_settings"],
          enabled_features: ["study_templates"],
          charts_storage_url: "http://saveload.tradingview.com",
          charts_storage_api_version: "1.1",
          client_id: "tradingview.com",
          timezone: "Asia/Tokyo",
          user_id: "public_user_id",
          widgetbar: {
            details: true,
            watchlist: true,
            watchlist_settings: {
              default_symbols: ["NYSE:AA", "NYSE:AAL", "NASDAQ:AAPL"],
              readonly: false
            }
          }
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
