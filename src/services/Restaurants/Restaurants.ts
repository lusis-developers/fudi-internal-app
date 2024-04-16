import type { AxiosResponse } from "axios";
import APIBase from "../Base";
import type { Business } from "@/typings/Business";

class APIRestaurants extends APIBase {
  async getAllRestaurants(): Promise<AxiosResponse<any[]>> {
    return this.get('get-all-restaurants')
  }
  async addRestaurant(restaurant: Business): Promise<AxiosResponse<any>> {
    return this.post('add-restaurant', restaurant)
  }
  async editRestaurant(restaurant: Business): Promise<AxiosResponse<any>> {
    return this.put('edit-something-restaurant', restaurant)
  }
}

export default APIRestaurants