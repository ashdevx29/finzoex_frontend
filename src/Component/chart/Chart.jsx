import React, { useEffect, useRef } from "react";
import { env } from "../../core/service/envconfig";

const Chart = ({ pair = "BTC_USDT", theme = "Dark" }) => {
  const containerRef = useRef(null);
  const tvWidgetRef = useRef(null);

  const getLanguageFromURL = () => {
    const regex = new RegExp("[\\?&]lang=([^&#]*)");
    const results = regex.exec(window.location.search);
    return results === null
      ? null
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  };

  useEffect(() => {
    if (!window.Datafeeds || !window.TradingView) return;

    if (tvWidgetRef.current) {
      tvWidgetRef.current.remove();
      tvWidgetRef.current = null;
    }

    const widgetOptions = {
      symbol: pair,
      datafeed: new window.Datafeeds.UDFCompatibleDatafeed(
        env.apiHost + "chartapi/chart"
      ),
      interval: "5",
      container_id: "tv_chart_container_inline",
      library_path: "/charting_library/",
      locale: getLanguageFromURL() || "en",
      disabled_features: ["use_localstorage_for_settings"],
      enabled_features: ["study_templates"],
      client_id: "tradingview.com",
      user_id: "public_user_id",
      fullscreen: false,
      width: "100%",
      height: "400",
      theme: theme,
      loading_screen: { backgroundColor: "#0d042c" },
      toolbar_bg: "#0d042c",
      overrides: {
        "paneProperties.background": "#0d042c",
        "paneProperties.vertGridProperties.color": "transparent",
        "paneProperties.horzGridProperties.color": "transparent",
      },
    };

    if (theme === "White") {
      delete widgetOptions.toolbar_bg;
      delete widgetOptions.overrides;
    }

    tvWidgetRef.current = new window.TradingView.widget(widgetOptions);

    return () => {
      if (tvWidgetRef.current) {
        tvWidgetRef.current.remove();
        tvWidgetRef.current = null;
      }
    };
  }, [pair, theme]);

  return <div id="tv_chart_container_inline" ref={containerRef} />;
};

export default Chart;
