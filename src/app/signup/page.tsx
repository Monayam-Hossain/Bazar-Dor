import React from 'react';

const SignUpPage = () => {
    return (
        <div>
            <form>
                <label>Name</label>
                <br />
                <input name="name" type="text" id="" placeholder='Name'/>
                <br />
                <label>Image</label>
                <br />
                <input name="image" type="url" id="" placeholder='Image'/>
                <br />
                <label>Email</label>
                <br />
                <input name="email" type="email" id="" />
                <br />
                <label>Password</label>
                <br />
                <input name="password" type="password" id="" />
                <br />
                <button>Sign Up</button>
            </form>
        </div>
    );
};

export default SignUpPage;