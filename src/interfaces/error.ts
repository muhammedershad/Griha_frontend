interface errorObject{
    error : boolean,
    message : string
}

interface ApiResponse {
    data: unknown; // Replace 'unknown' with the actual type of your data
}
  
export type { ApiResponse }



export default errorObject