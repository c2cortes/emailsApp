@extends('layouts.master', ['section' => 'New Email'])

<div class="alert alert-primary" role="alert">New Email</div>

@section('content')
        <div id="emailform"></div>
        <script src="{{ asset('js/app.js') }}"></script>
@stop