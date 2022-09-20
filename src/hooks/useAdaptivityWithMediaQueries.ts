import * as React from "react";
import {
  hasMouse as hasMouseLib,
  hasHover as deviceHasHoverLib,
} from "@vkontakte/vkjs";
import {
  AdaptivityContext,
  type AdaptivityProps as BaseAdaptivityProps,
} from "../components/AdaptivityProvider/AdaptivityContext";
import { getOrDefault } from "../helpers/getOrDefault";
import {
  getViewWidthByMediaQueries,
  getViewHeightByMediaQueries,
  getSizeX,
  getSizeY,
  checkIsDesktop,
} from "../lib/adaptivity";
import { useMediaQueries } from "./useMediaQueries";
import { usePlatform } from "./usePlatform";

interface AdaptivityProps extends BaseAdaptivityProps {
  isDesktop: boolean;
}

/**
 * Высчитывает и возвращает параметры адаптивности при изменении вьюпорта.
 *
 * Берёт в приоритет значения из `AdaptivityContext.
 *
 * > ⚠ SSR
 * >
 * > Во избежания ошибок при гидрации, не используйте данный хук, если есть вероятность, что компонент будет отрендерен
 * > на стороне сервера.
 * >
 * > Лучше всего использовать для всплывающих окон, т.к. они вызывается только после загрузки
 * > страницы либо пользователем, либо программно.
 */
export const useAdaptivityWithMediaQueries = (): AdaptivityProps => {
  const {
    viewWidth: viewWidthContext,
    viewHeight: viewHeightContext,
    sizeX: sizeXContext,
    sizeY: sizeYContext,
    hasMouse: hasMouseContext,
    deviceHasHover: deviceHasHoverContext,
  } = React.useContext(AdaptivityContext);

  const platform = usePlatform();
  const mediaQueries = useMediaQueries();

  const [[viewWidthLocal, viewHeightLocal], setViewSizeLocal] = React.useState(
    () => [
      getOrDefault(viewWidthContext, getViewWidthByMediaQueries(mediaQueries)),
      getOrDefault(
        viewHeightContext,
        getViewHeightByMediaQueries(mediaQueries)
      ),
    ]
  );

  const adaptivityProps = React.useMemo(() => {
    const hasMouse = getOrDefault(hasMouseContext, hasMouseLib);
    const deviceHasHover = getOrDefault(
      deviceHasHoverContext,
      deviceHasHoverLib
    );
    const viewWidth = getOrDefault(viewWidthContext, viewWidthLocal);
    const viewHeight = getOrDefault(viewHeightContext, viewHeightLocal);
    const sizeX = getOrDefault(sizeXContext, getSizeX(viewWidth));
    const sizeY = getOrDefault(
      sizeYContext,
      getSizeY(viewWidth, viewHeight, hasMouse)
    );
    const isDesktop = checkIsDesktop(viewWidth, viewHeight, hasMouse, platform);

    return {
      viewWidth,
      viewHeight,
      sizeX,
      sizeY,
      hasMouse,
      deviceHasHover,
      isDesktop,
    };
  }, [
    viewWidthLocal,
    viewHeightLocal,
    viewWidthContext,
    viewHeightContext,
    sizeXContext,
    sizeYContext,
    hasMouseContext,
    deviceHasHoverContext,
    platform,
  ]);

  React.useEffect(() => {
    const handleMediaQuery = () => {
      setViewSizeLocal((prevSizeLocal) => {
        const newViewWidthLocal = getOrDefault(
          viewWidthContext,
          getViewWidthByMediaQueries(mediaQueries)
        );
        const newViewHeightLocal = getOrDefault(
          viewHeightContext,
          getViewHeightByMediaQueries(mediaQueries)
        );

        const [prevViewWidthLocal, prevViewHeightLocal] = prevSizeLocal;

        if (
          prevViewWidthLocal !== newViewWidthLocal ||
          prevViewHeightLocal !== newViewHeightLocal
        ) {
          return [newViewWidthLocal, newViewHeightLocal];
        }

        return prevSizeLocal;
      });
    };

    if (!viewWidthContext) {
      mediaQueries.desktopPlus.addEventListener("change", handleMediaQuery);
      mediaQueries.tablet.addEventListener("change", handleMediaQuery);
      mediaQueries.smallTablet.addEventListener("change", handleMediaQuery);
      mediaQueries.mobile.addEventListener("change", handleMediaQuery);
    }

    if (!viewHeightContext) {
      mediaQueries.mediumHeight.addEventListener("change", handleMediaQuery);
      mediaQueries.mobileLandscapeHeight.addEventListener(
        "change",
        handleMediaQuery
      );
    }

    return () => {
      mediaQueries.desktopPlus.removeEventListener("change", handleMediaQuery);
      mediaQueries.tablet.removeEventListener("change", handleMediaQuery);
      mediaQueries.smallTablet.removeEventListener("change", handleMediaQuery);
      mediaQueries.mobile.removeEventListener("change", handleMediaQuery);
      mediaQueries.mediumHeight.removeEventListener("change", handleMediaQuery);
      mediaQueries.mobileLandscapeHeight.removeEventListener(
        "change",
        handleMediaQuery
      );
    };
  }, [mediaQueries, viewWidthContext, viewHeightContext]);

  return adaptivityProps;
};