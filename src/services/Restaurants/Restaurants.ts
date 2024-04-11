import type { AxiosResponse } from "axios";
import APIBase from "../Base";

class APIRestaurants extends APIBase {
  async getAllRestaurants(): Promise<AxiosResponse<any[]>> {
    return this.get('get-all-restaurants')
  }
}

export default APIRestaurants