import * as React from 'react';
import { baselineComponent } from '../../testing/utils';
import { IconButtonProps, IconButton } from './IconButton';
import { render, screen } from '@testing-library/react';
import { Icon28VoiceOutline } from '@vkontakte/icons';

const IconButtonTest = (props: IconButtonProps) => (
  <IconButton data-testid="button" aria-label="Тестовая кнопка" {...props}>
    <Icon28VoiceOutline />
  </IconButton>
);
const button = () => screen.getByTestId('button');

describe('IconButton', () => {
  /*
   * a11y: Buttons must have discernible text (button-name)
   * a11y: Links must have discernible text (link-name)
   *       мы не можем задать компоненту дефолтный aria-label,
   *       поэтому фиксим тест тем, что передаем его сами
   */
  baselineComponent((p) => <IconButton aria-label="IconButton" {...p} />);

  it('Component: default IconButton is a button', () => {
    render(<IconButtonTest />);
    expect(button().tagName.toLowerCase()).toMatch('button');
  });

  it('Component: IconButton w/ href is a link', () => {
    render(<IconButtonTest href="https://vk.com" />);
    expect(button().tagName.toLowerCase()).toMatch('a');
  });

  it('Component: IconButton w/ href overrides explicit Component', () => {
    render(<IconButtonTest href="https://vk.com" Component="div" />);
    expect(button().tagName.toLowerCase()).toMatch('a');
  });
});