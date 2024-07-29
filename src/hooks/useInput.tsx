import React, { useState } from "react"

const useInput = (initialValue: string) => {
    const [value, setValue] = useState(initialValue)
    
    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value)

    const reset = () => setValue(initialValue)
    
  return {
    value,
    onInputChange,
    reset
  }
}

export default useInput