import React from 'react'
export default {
    get: jest.fn(()=>Promise.resolve({data:{}})),
    all: jest.fn(()=>Promise.resolve({data:{}})),
    spread: jest.fn(()=> {React.useState()})

}