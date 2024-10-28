'use client'
import { AppProgressBar } from "next-nprogress-bar";

export default function ProgressBar() {
    return <AppProgressBar
        height="4px"
        color="#3b82f6"
        options={{ showSpinner: false }}
        shallowRouting
    />
}