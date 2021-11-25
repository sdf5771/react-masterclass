import { useQuery } from "react-query";
import { fetchCoinPrice } from "../api";
import {AgGridColumn, AgGridReact} from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';


interface IPrice {
    id : string;
    name : string;
    symbol : string;
    rank : number;
    circulating_supply : number;
    total_supply : number;
    max_supply : number;
    beta_value : number;
    first_data_at : string;
    last_updated : string;
    quotes : {
        USD : {
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        }
    };
}

interface PriceProps {
    coinId : string;
};

function Price({coinId}:PriceProps) {
    const { isLoading, data } = useQuery<IPrice>(["PriceData", coinId], () => fetchCoinPrice(coinId),
    {
        refetchInterval : 10000, // refetch interval data 10000 ms
    }
    );
    const rowData = [
        {Changed: " 15Minute", Price: `$${data?.quotes.USD.percent_change_15m}`},
        {Changed: " 30Minute", Price: `$${data?.quotes.USD.percent_change_30m}`},
        {Changed: " 1Hour", Price: `$${data?.quotes.USD.percent_change_1h}`},
        {Changed: " 6Hour", Price: `$${data?.quotes.USD.percent_change_6h}`},
        {Changed: " 24Hour", Price: `$${data?.quotes.USD.percent_change_24h}`},
        {Changed: " 30Days", Price: `$${data?.quotes.USD.percent_change_30d}`},
    ];
    return (
        <div>{isLoading ? "Loading Price..." : (
            <div className="ag-theme-balham-dark" style={{height: 300, width: 430}}>
                <AgGridReact
                    rowData={rowData}>
                    <AgGridColumn field="Changed"></AgGridColumn>
                    <AgGridColumn field="Price"></AgGridColumn>
                </AgGridReact>
            </div>
        )}
       </div>
    );
};

export default Price;