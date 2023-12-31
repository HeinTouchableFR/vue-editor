<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/src/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&display=swap" rel="stylesheet">
    <script type='module' defer>
        import {
            Alignment,
            Checkbox,
            EN,
            HTMLText,
            Number as NumberField,
            Range,
            Repeater,
            DatePicker,
            Row,
            Select,
            Tabs,
            Text,
            TextAlign,
            Editor,
            Color,
            ImageUrl
        } from '/dist/Editor.standalone.js'
        const Colors = [
            '--bs-blue',
            '--bs-indigo',
            '--bs-purple',
            '--bs-pink',
            '--bs-red',
            '--bs-orange',
            '--bs-yellow',
            '--bs-green',
            '--bs-teal',
            '--bs-cyan',
            '--bs-white',
            '--bs-gray',
            '--bs-gray-dark',
            '--bs-primary',
            '--bs-secondary',
            '--bs-success',
            '--bs-info',
            '--bs-warning',
            '--bs-danger',
            '--bs-light',
            '--bs-dark',
        ]
        const editor = new Editor({
            lang: EN,
        })
        editor.registerComponent('demo', {
            title: 'All field',
            fields: [
                Text('text', { label: 'Text' }),
                HTMLText('oneline', { label: 'HTML One line', multiline: false }),
                HTMLText('multiline', {
                    label: 'HTML Multiline',
                    multiline: true,
                    colors: Colors,
                    backgroundColor: 'color',
                    defaultAlign: 'textalign',
                }),
                NumberField('number', { label: 'Number' }),
                Checkbox('checkbox', { label: 'Checkbox' }),
                Checkbox('checkbox1', { label: 'Checkbox 1' }).when('checkbox', true),
                Checkbox('checkbox2', { label: 'Checkbox 2' }).when(
                    'checkbox1',
                    (v) => v
                ),
                ImageUrl('image', {
                    label: 'image',
                    onBrowse: (url) => Promise.resolve('https://picsum.photos/425/458'),
                }),
                DatePicker('date', { label: 'Date' }),
                Color('color', { label: 'Color', colors: Colors }),
                Range('range', { min: 0, max: 100, label: 'Range' }),
                Select('select', {
                    options: [
                        { label: 'Option 1', value: '1' },
                        { label: 'Option 2', value: '2' },
                    ],
                    label: 'Select',
                }),
                Alignment('alignment', { vertical: true, label: 'Alignment' }),
                TextAlign('textalign', { vertical: true, label: 'Text Align' }),
                Row([Text('text1'), Text('text2'), Text('text3')]),
                Tabs(
                    {
                        label: 'Content',
                        fields: [Text('text4', { label: 'Content' })],
                    },
                    {
                        label: 'Settings',
                        fields: [Text('settings', { label: 'Settings' })],
                    }
                ),
                Repeater('repeater', {
                    label: 'Repeater',
                    fields: [Text('text1', {label: 'Text 1'}), Text('text2', {label: 'Text 2'}), Text('text3', {label: 'Text 3'})],
                }),
            ],
        })
        editor.defineElement()
    </script>
    <script></script>
    <style>
        html,
        body {
            font-family: DM Sans, sans-serif;
            font-size: 16px;
        }
        *, *::before, *::after {
            box-sizing: border-box;
        }
        .button {
            font: inherit;
            padding: .5em 1em;
            border-radius: 3px;
            border: none;
            background-color: rgb(99, 102, 241);
            color: #FFF;
        }
        .hero {
            max-width: 800px;
            margin: 40px auto;
            text-align: center;
        }
        :root {
            --bs-blue: #0d6efd;
            --bs-indigo: #6610f2;
            --bs-purple: #6f42c1;
            --bs-pink: #d63384;
            --bs-red: #dc3545;
            --bs-orange: #fd7e14;
            --bs-yellow: #ffc107;
            --bs-green: #198754;
            --bs-teal: #20c997;
            --bs-cyan: #0dcaf0;
            --bs-white: #fff;
            --bs-gray: #6c757d;
            --bs-gray-dark: #343a40;
            --bs-primary: #0d6efd;
            --bs-secondary: #6c757d;
            --bs-success: #198754;
            --bs-info: #0dcaf0;
            --bs-warning: #ffc107;
            --bs-danger: #dc3545;
            --bs-light: #f8f9fa;
            --bs-dark: #212529;
            --font: "FormaDJRDisplay";
            --color-dark: #3a343d;
            --color: #aea8b3;
            --color-light: #e3dfe6;
            --color-transparent: #{rgba(#121c42, 0)};
            --contrast: #364893;
            --accent: #9a0ff1;
            --contrast25: #3648933f;
            --gap: 20px;
            --space: 8px;
            --border: #d5e3ec;
            --border-light: #364893;
            --background: #fbfafc;
            --background-light: #fff;
            --shadow: #d8e1e8;
            --list-hover: var(--background);
            --card-footer: #f7fafd;
            --card-padding: 16px;
            --red: #f25353;
            --green: #41cf7c;
            --yellow: #feb32b;
            --yellow-alpha: #feb32b4c;
            --skeleton: var(--color-light);
            --header-background: #fffffff2;
            --white: white;
            --color-1: #023e8a;
            --color-2: #e85d04;
            --color-3: #6a994e;
            --color-4: #d00000;
            --color-5: #ffb703;
            --color-6: #8338ec;
        }
    </style>
</head>
<body>
<form action="" method="get">
    <editor-builder
        name="content"
        preview="http://localhost:8000/server/index.php"
        iconsUrl="/[name].svg"
        id="editor1"
        value=""
    ></editor-builder>
</form>
</body>
</html>