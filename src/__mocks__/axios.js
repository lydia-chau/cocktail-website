
export default {
    get: jest.fn(()=>Promise.resolve({data:{}})),
    all: jest.fn(()=>Promise.resolve({data:{}})),
    spread: jest.fn((data)=> {console.log(data)})

}