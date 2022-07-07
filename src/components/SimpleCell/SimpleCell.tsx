import * as React from "react";
import { HasComponent } from "../../types";
import { classNames } from "../../lib/classNames";
import { getClassName } from "../../helpers/getClassName";
import { TappableProps, Tappable } from "../Tappable/Tappable";
import { Icon24Chevron } from "@vkontakte/icons";
import { ANDROID, IOS } from "../../lib/platform";
import { usePlatform } from "../../hooks/usePlatform";
import { hasReactNode } from "../../lib/utils";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { withAdaptivity, SizeType } from "../../hoc/withAdaptivity";
import { Title } from "../Typography/Title/Title";
import { Text } from "../Typography/Text/Text";
import { Subhead } from "../Typography/Subhead/Subhead";
import { Headline } from "../Typography/Headline/Headline";
import "./SimpleCell.css";

export interface SimpleCellOwnProps extends HasComponent {
  /**
   * Иконка 28 или `<Avatar size={28|32|40|48|72} />`
   */
  before?: React.ReactNode;
  /**
   * Иконка 12 или `<Badge />`. Добавится справа от текста `children`.
   */
  badge?: React.ReactNode;
  /**
   * Контейнер для текста справа от `children`.
   */
  indicator?: React.ReactNode;
  /**
   * Иконка 24|28 или `<Switch />`. Располагается справа от `indicator`.
   */
  after?: React.ReactNode;
  /**
   * Контейнер для текста под `children`.
   */
  description?: React.ReactNode;
  /**
   * Убирает анимацию нажатия
   */
  disabled?: boolean;
  /**
   * В iOS добавляет chevron справа. Передавать `true`, если предполагается переход при клике по ячейке.
   */
  expandable?: boolean;
  multiline?: boolean;
}

export interface SimpleCellProps extends SimpleCellOwnProps, TappableProps {}

type SimpleCellTypographyProps = React.HTMLAttributes<HTMLDivElement> &
  HasComponent;

const SimpleCellTypography = (props: SimpleCellTypographyProps) => {
  const { sizeY } = useAdaptivity();
  const platform = usePlatform();

  if (sizeY === SizeType.COMPACT) {
    return <Text {...props} />;
  } else if (platform === ANDROID) {
    return <Headline Component="span" weight="3" {...props} />;
  } else {
    return <Title Component="span" level="3" weight="3" {...props} />;
  }
};

const SimpleCellComponent = ({
  badge,
  before,
  indicator,
  children,
  after,
  description,
  expandable,
  multiline,
  sizeY,
  ...restProps
}: SimpleCellProps) => {
  const platform = usePlatform();
  const hasAfter = hasReactNode(after) || (expandable && platform === IOS);

  return (
    <Tappable
      {...restProps}
      // eslint-disable-next-line vkui/no-object-expression-in-arguments
      vkuiClass={classNames(
        getClassName("SimpleCell", platform),
        {
          "SimpleCell--exp": expandable,
          "SimpleCell--mult": multiline,
        },
        `SimpleCell--sizeY-${sizeY}`
      )}
    >
      {before}
      <div vkuiClass="SimpleCell__main">
        <div vkuiClass="SimpleCell__content">
          <SimpleCellTypography vkuiClass="SimpleCell__children">
            {children}
          </SimpleCellTypography>
          {hasReactNode(badge) && (
            <span vkuiClass="SimpleCell__badge">{badge}</span>
          )}
        </div>
        {description && (
          <Subhead Component="span" vkuiClass="SimpleCell__description">
            {description}
          </Subhead>
        )}
      </div>
      {hasReactNode(indicator) && (
        <SimpleCellTypography
          Component="span"
          vkuiClass="SimpleCell__indicator"
        >
          {indicator}
        </SimpleCellTypography>
      )}
      {hasAfter && (
        <div vkuiClass="SimpleCell__after">
          {after}
          {expandable && platform === IOS && <Icon24Chevron />}
        </div>
      )}
    </Tappable>
  );
};

/**
 * @see https://vkcom.github.io/VKUI/#/SimpleCell
 */
export const SimpleCell = withAdaptivity(SimpleCellComponent, { sizeY: true });