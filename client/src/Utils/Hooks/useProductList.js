import { useEffect } from "react";
import { SERVER_API } from "../constants";
import axios from "axios"

const useProductList = async (page,rowperpage,rowchange)=>{
    useEffect(() => {
        const getAllMovies = async () => {
          try {
            const url = `${SERVER_API}?page=${page}&limit=${rowperpage}`;
            const response = await axios.get(url);
            const {
              data: {
                data: { info },
              },
            } = response;
            rowchange(info);
            console.log(info);
          } catch (error) {
            console.log(error);
          }
        };
        getAllMovies();
      }, [page]);
}

export default useProductList