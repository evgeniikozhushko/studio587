import React from 'react'
import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="grid w-full grid-cols-1 md:grid-cols-12 px-5 gap-y-4">
            <div className="container md:col-span-3">
                <p className="text-start text-xs">
                    &copy; {new Date().getFullYear()} Studio 587. All rights reserved.
                </p>
            </div>
        </footer>
    )
}