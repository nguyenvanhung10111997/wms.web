import { IClusterState } from "./cluster/state/cluster.state";
import { ILineClusterProductState } from "./line-cluster-product/state/line-cluster-product.state";
import { ILineState } from "./line/state/line.state";
import { IMachinesState } from "./machines/state/machines.state";
import { IOrdersState } from "./orders/state/orders.state";
import { IProductState } from "./product/state/product.state";
import { IStaticShiftState } from "./static-shift/state/static-shift.state";
import { IWeatherForecastState } from "./weather-forecast/state/weather-forecast.state";

export interface IAppState {
  weatherForecast: IWeatherForecastState;
  line: ILineState;
  lineClusterProduct: ILineClusterProductState;
  staticShift: IStaticShiftState;
  cluster: IClusterState;
  machines: IMachinesState;
  product: IProductState;
  orders: IOrdersState
}
