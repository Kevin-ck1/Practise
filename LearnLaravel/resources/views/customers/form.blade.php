
            <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" name="name" id = "name" value="{{old('name') ?? $customer->name}}">
            </div>
            <br>
            <div class="form-group">
                <label for="email">Email: </label>
                <input type="text" name="email" id = "email" value="{{old('email') ?? $customer->email}}">
            </div>          

            <div>
                {{$errors->first('name')}}
                <br>
                {{$errors->first('email')}}
            </div>
 
            <div class="form-group">
                <label for="active">Status:</label>
                <select name="active" id="active" class="">
                    <option value=""disabled>Select Customer Status</option>
                    @foreach ($customer->activeOptions() as $activeOptionsKey=>$activeOptionsValue)
                        <option value="{{$activeOptionsKey}}"{{$customer->active == $activeOptionsValue ? 'selected':''}}>{{$activeOptionsValue}}</option>      
                    @endforeach
                </select>
            </div>

            <div class="form-group">
                <label for="company_id">Company:</label>
                <select name="company_id" id="company_id">
                    @foreach ($companies as $company)
                        <option value="{{$company->id}}"{{$company->id==$customer->company_id ? 'selected' : '' }}>{{$company->name}}</option>
                    @endforeach
                    
                </select>
            </div>   

            <div class="form-group">
                <label for="image">Upload Profile image</label><br>
                <input type="file" name = "image">
                <br>
                {{$errors->first('image')}}
            </div>
            
            @csrf
    