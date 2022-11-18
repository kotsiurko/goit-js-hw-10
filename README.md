# Parcel template

Цей проєкт було створено за допомогою Parcel. Для ознайомлення та налаштування
додаткових можливостей [звернись в документацію](https://parceljs.org/).

## Підготовка нового проєкту

1. Впевнись, що на комп'ютері встановлена LTS-версія Node.js.
   [Завантаж та встанови](https://nodejs.org/en/) її, якщо необхідно.
2. Клонуй цей репозиторій.
3. Зміни назву папки із `parcel-project-template` на ім'я свого проєкту.
4. Створи новий пустий репозиторій на GitHub.
5. Відкрий проєкт у VSCode, запусти термінал та зв'яжи проєкт із
   GitHub-репозиторієм
   [за інструкцією](https://docs.github.com/en/get-started/getting-started-with-git/managing-remote-repositories#changing-a-remote-repositorys-url).
6. Встанови залежності проєкту в терміналі командою `npm install`.
7. Запусти режим розробки, виконавши команду `npm start`.
8. Перейди в браузері за адресою [http://localhost:1234](http://localhost:1234).
   Ця сторінка буде автоматично перезавантажуватись після збереження змін у
   файлах проєкту.

## Файли та папки

- Усі паршали файлів стилів повинні лежати в папці `src/sass` та імпортуватись у
  файли стилів сторінок. Наприклад, для `index.html` файл стилів називається
  `index.scss`.
- Зображення додавай в папку `src/images`. Збирач оптимізує їх, але тільки при
  деплої продакшн версії проєкту. Все це відбувається віддалено, щоб не
  перевантажувати твій комп'ютер, адже на слабких машинах це може зайняти багато
  часу.

## Деплой

Для налаштування деплою проєкту необхідно виконати декілька додаткових кроків по
налаштуванню твого репозиторію. Зайди у вкладку `Settings` та в підсекції
`Actions` обери пункт `General`.

![GitHub actions settings](./assets/actions-config-step-1.png)

Прогорни сторінку до останньої секції та впевнись, що там обрані опції, як
зображено нижче та натисни `Save`. Без цих налаштувань у збірки буде недостатньо
прав для автоматизації процесу деплою.

![GitHub actions settings](./assets/actions-config-step-2.png)

Продакш версія проєкту буде автоматично збиратись і деплоїтись на GitHub Pages,
у вітку `gh-pages`, кожен раз, коли оновлюється вітка `main`. Наприклад, після
прямого пушу або прийнятого пул-реквесту. Для цього необхідно у файлі
`package.json` відредагувати поле `homepage` та скрипт `build`, замінивши
`your_username` та `your_repo_name` на свої та відправити зміни на GitHub.

```json
"homepage": "https://your_username.github.io/your_repo_name/",
"scripts": {
  "build": "parcel build src/*.html --public-url /your_repo_name/"
},
```

Дальше необхідно зайти в налаштування GitHub-репозиторію (`Settings` > `Pages`)
та виставити роздачу продакшн версії файлів із папки `/root` вітки `gh-pages`,
якщо це не було зроблено автоматично.

![GitHub Pages settings](./assets/repo-settings.png)

### Статус деплою

Статус деплою крайнього коміту відображається іконкою біля його ідентифікатора.

- **Жовтий колір** - виконується збір та деплой проєкту.
- **Зелений колір** - деплой завершився успішно.
- **Червоний колір** - під час лінтингу, збору або деплою відбулась помилка.

Більш детальну інформацію про статус можна подивитись, клікнувши по іконці, і у
випадаючому вікні перейти за посиланням `Details`.

![Deployment status](./assets/status.png)

### Жива сторінка

Через деякий час (зазвичай, кілька хвилин) живу сторінку можна буде переглянути
за адресою, вказаною у відредагованій властивості `homepage`. Наприклад, ось
посилання на живу сторінку версії для цього репозиторію
[https://goitacademy.github.io/parcel-project-template](https://goitacademy.github.io/parcel-project-template).

Якщо відкривається пуста сторінка, переконайся, що у вкладці `Console` немає
помилок, пов'язаних із неправильними шляхами до CSS та JS файлів проекту
(**404**). Швидше за все в тебе неправильне значення властивості `homepage` або
скрипта `build` у файлі `package.json`.

## Як це працює

![How it works](./assets/how-it-works.png)

1. Після кожного пушу у вітку `main` GitHub-репозиторію, запускається
   спеціальний скрипт (GitHub Action) із файлу `.github/workflows/deploy.yml`.
2. Всі файли репозиторию копіюються на сервер, де проєкт ініціалізується та
   проходить збір перед деплоєм.
3. Якщо усі кроки пройшли успішно, зібрана продакшн-версія файлів проєкту
   відправляється у вітку `gh-pages`. В іншому випадку, в лог-файлі виконання
   скрипта буде вказано в чому проблема.
