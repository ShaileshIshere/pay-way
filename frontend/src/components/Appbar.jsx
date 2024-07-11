export const Appbar = ({ label }) => {
    return(
        <div className="flex justify-between items-center space-between px-12 py-5 bg-neutral-200">
            <div className="cursor-pointer text-2xl subpixel-antialiased font-medium tracking-tight">
                PayWay App
            </div>
            <div className="flex">
                <div className="cursor-default flex flex-col justify-center mr-3 text-xl subpixel-antialiased font-normal tracking-tight">
                    Hello { label }
                </div>
                <div className="bg-neutral-300 h-12 w-12 flex justify-center rounded-full">
                    <div className="cursor-default flex flex-col justify-center h-full text-xl font-bold">
                        { label.toUpperCase()[0] }
                    </div>
                </div>
            </div>
        </div>
    );
}