import type { NextPage } from 'next'
import DefaultLayout from "../components/layouts/DefaultLayout";
import {ReactElement, useLayoutEffect, useState} from "react";
import clsx from "clsx";


export default function Home(){
    return (
        <>
            <div className={clsx('relative w-full h-screen -mt-20 z-[-10]')}>
                <div className={clsx('max-w-7xl m-auto pt-20')}>
                    <div>
                        <h1 id={'title'} className={clsx('text-5xl')}>Le beau titre</h1>
                        <p className={clsx('text-xl')}>la belle description</p>
                    </div>
                </div>
                <img className={clsx('absolute w-screen h-screen object-cover inset-0 opacity-80 ')} src={"/giphy.gif"} />
            </div>
            <div className={clsx('h-screen')}>

            </div>
        </>
    )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
      <DefaultLayout>
          {page}
      </DefaultLayout>
  )
}