@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">Emails List</div>

                <div class="card-body">
                        <div class="container">
                                <a href="emails/new" class="btn btn-primary btn-lg active new-email-button" role="button" aria-pressed="true">New Email</a>
                            </div>
                            
                            <div class="container">
                                <div class="row">
                                    <div class="col-3 table-head">
                                        Subject
                                    </div>
                                    <div class="col-3 table-head">
                                        Content
                                    </div>
                                    <div class="col-3 table-head">
                                        Author
                                    </div>
                                    <div class="col-3 table-head">
                                        Date
                                    </div>
                                </div>
                                @foreach ($data as $item)
                                    <div class="row">
                                        <div class="col-3 table-row">
                                            {{ $item->subject }}
                                        </div>
                                        <div class="col-3 table-row">
                                            {{ $item->content }}
                                        </div>
                                        <div class="col-3 table-row">
                                            {{ $item->author }}
                                        </div>
                                        <div class="col-3 table-row">
                                            {{ $item->created_at }}
                                        </div>
                                    </div>
                                @endforeach
                            
                                {{ $data->links() }}
                            </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
