import { Children } from "react";

export function Eaching({ of = [], render }) {
    return Children.toArray(of.map((item, index) => render(item, index)))
}