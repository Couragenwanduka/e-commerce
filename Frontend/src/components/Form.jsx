function FORM(){
    return(
        <div className="shadow-md shadow-black bg-zinc-500 p-8">
            <h1 className="mt-10 text-xl antialiased font-bold text-gray-800 ml-20">Register</h1>
            <form className="flex flex-col mt-10">
                <label className="ml-96 w-80 border-black">NAME</label>
                <input type="text" placeholder="Enter your name" className="ml-96 w-80 border-gray-500 p-3 rounded border-2"/>
                <label className="ml-96 w-80 border-black">EMAIL</label>
                <input type="text" placeholder="Enter your email" className="ml-96 w-80 border-gray-500 p-3 rounded border-2"/>
                <label className="ml-96 w-80 border-black">Password</label>
                <input type="password" placeholder="Enter your password" className="ml-96 w-80 border-gray-500 p-3 rounded border-2"/>
                <button type="submit" className="p-4 mt-3 bg-amber-500 w-32 ml-96">Submit</button>
                <p>if you have an account <a> Click to Login</a></p>
            </form>
        </div>
    )
}

export default FORM;