import * as React from "react"

// eslint-disable-next-line react/prop-types
const Textarea = React.forwardRef(({ className, ...props }, ref) => {
    return (
        <textarea
            className="flex min-h-20 w-full rounded-md border border-gray-200 bg-transparent px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
            ref={ref}
            {...props}
        />
    )
})
Textarea.displayName = "Textarea"

export { Textarea }