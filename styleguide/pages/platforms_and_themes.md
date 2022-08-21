Как уже было сказано ранее, VKUI может мимикрировать под дизайны разных платформ. Благодаря этой особенности,
у вас есть возможность расширять функционал ВКонтакте интерфейсами, которые неотличимы от нативных разделов.

## Платформы

На данный момент поддерживаются 3 платформы — `ios`, `android` и `vkcom`. Для применения дизайна платформы, достаточно
передать её в компонент [`ConfigProvider`](https://vkcom.github.io/VKUI/#/ConfigProvider) в качестве значения свойства `platform`.

> **Важно**
>
> Дефолтной считается платформа `android`. Такое название — это историческое наследие. Эту тему стоит применять не только
> при встраивании в наш Android клиент, но и для [m.vk.com](https://m.vk.com). Она так же подходит для разработки
> standalone-приложений (то есть приложений, которые работают как полноценный сайт и никуда не встраиваются)

```jsx static
<ConfigProvider platform="ios">
  <AdaptivityProvider>
    <AppRoot>
      <SimpleCell>
        Эта ячейка будет выглядеть точь в точь как в iOS клиенте ВКонтакте
      </SimpleCell>
    </AppRoot>
  </AdaptivityProvider>
</ConfigProvider>
```

Чтобы получить значение текущей платформы можно использовать хук `usePlatform` или HOC `withPlatform`. Подробнее об
этих инструментах можно познакомиться в [утилитах](https://vkcom.github.io/VKUI/#/Utils).

> **Важно**
>
> Платформа `vkcom` не предназначена для адаптивного интерфейса. Используйте её только в том случае, если
> ваше приложение встроено в десктопный [vk.com](https://vk.com).

### Автоматическое определение платформы

Передавать платформу в `ConfigProvider` необязательно. Этот служебный компонент умеет определять её автоматически.

## Темы

У каждой платформы есть две темы: светлая (`light`) и тёмная (`dark`).
Применить тему можно передав её значение в свойство `appearance` компонента [`ConfigProvider`](https://vkcom.github.io/VKUI/#/ConfigProvider).

```jsx static
<ConfigProvider appearance="dark">
  <AdaptivityProvider>
    <AppRoot>
      <SimpleCell>Вечереет...</SimpleCell>
    </AppRoot>
  </AdaptivityProvider>
</ConfigProvider>
```

### Переопределение темы для отдельных компонентов

Если вам необходимо переопределить тему для отдельных компонентов приложение то это можно сделать через `AppearanceProvider`.

```jsx static
<AppearanceProvider appearance="dark">
  <Snackbar action="Поделиться">Поделиться</Snackbar>
</AppearanceProvider>
```

### Откуда взять значение темы при встраивании?

Если ваше приложение встраивается в наши iOS или Android клиенты, то тему можно получить через [vk-bridge](https://www.npmjs.com/package/@vkontakte/vk-bridge).
Каждому мини-приложению клиент посылает событие `VKWebAppUpdateConfig`. В данных этого события помимо прочего есть поле `appearance`, которое и содержит текущую тему клиента.

### Наследование темы

Если ваше приложение само определяет цвета через css-переменные аналогично [bright_light.css](https://github.com/VKCOM/VKUI/blob/master/src/styles/bright_light.css), используйте `ConfigProvider scheme="inherit"`, а стили подключайте через `import '@vkontakte/vkui/dist/components.css'`.

### Использование темы в коде

У каждой темы есть поле `appearance`, которое определяет, тёмная она или светлая. В коде мы рекомендуем опираться
на значение этого свойства.

Его текущее значение можно определить с помощью хука `useAppearance`:

```jsx static
const appearance = useAppearance();
<Div>{appearance === "light" ? "Out of the blue" : "And into the black"}</Div>;
```

Appearance можно пригодиться для замены изображений на инвертированную версию в темных темах.