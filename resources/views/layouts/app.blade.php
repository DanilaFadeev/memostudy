<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>MemoStudy</title>
    <link href="{{mix('css/app.css')}}" rel="stylesheet" type="text/css">
    <link href="\fonts\iconfont\material-icons.css" rel="stylesheet">
    <link rel="shortcut icon" href="favicon.ico">
</head>
<body>
<noscript>
    You need to enable JavaScript to run this app.
</noscript>

<ul id="dropdownUser" class="dropdown-content">
    <li>
        <a href="{{ route('logout') }}" onclick="event.preventDefault();document.getElementById('logout-form').submit();">
            <i class="material-icons left">cancel</i> Logout
        </a>
        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
            {{ csrf_field() }}
        </form>
    </li>
</ul>
<nav>
    <div class="nav-wrapper teal lighten-3">
        <div class="container">
            <a href="/" class="brand-logo" style="padding-top: 6px"><img src="/img/logo.png"></a>
            <ul class="right hide-on-med-and-down">
                @guest
                <li><a href="{{ route('login') }}">Login</a></li>
                <li><a href="{{ route('register') }}">Register</a></li>
                @else
                    <li>
                        <a href="#" class="dropdown-button" href="#" data-activates="dropdownUser">
                            <i class="material-icons left">account_circle</i> <b>{{ Auth::user()->name }}</b>
                        </a>
                    </li>
                @endguest
            </ul>
        </div>
    </div>
</nav>
@yield('content')
<script src="{{mix('js/app.js')}}" ></script>
</body>
</html>