import clsx from "clsx"

const Footer = () =>{
    return (
        <footer className={clsx("h-12 bg-slate-800")}>
            <div className={clsx("flex justify-center h-full items-center")}>
                <h3 className={clsx("text-sm text-slate-200")}>© Quentin Aellen 2020</h3>
            </div>
        </footer>
    )

}

export default Footer