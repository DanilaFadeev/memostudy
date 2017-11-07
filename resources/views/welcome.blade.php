<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>React App</title>
    <link href="{{mix('css/app.css')}}" rel="stylesheet" type="text/css">
    <link href="\fonts\iconfont\material-icons.css" rel="stylesheet">
</head>
<body>
<noscript>
    You need to enable JavaScript to run this app.
</noscript>
<ul id="dropdownUser" class="dropdown-content">
    <li><a href="#!"><i class="material-icons left">trending_up</i> Progress</a></li>
    <li><a href="#!"><i class="material-icons left">settings</i> Settings</a></li>
    <li class="divider"></li>
    <li><a href="#!"><i class="material-icons left">cancel</i> Logout</a></li>
</ul>
<nav>
    <div class="nav-wrapper teal lighten-3">
        <div class="container">
            <a href="#!" class="brand-logo" style="padding-top: 6px"><img src="/img/logo.png"></a>
            <ul class="right hide-on-med-and-down">
                <li>
                    <a href="#" class="dropdown-button" href="#" data-activates="dropdownUser">
                        <i class="material-icons left">account_circle</i> <b>UserName</b>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</nav>

<div id="app"></div>
<script src="{{mix('js/app.js')}}" ></script>
</body>
</html>