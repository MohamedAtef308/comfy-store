import { Form, Link, useLoaderData } from "react-router-dom";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import RangeInput from "./RangeInput";
import CheckboxInput from "./CheckboxInput";

const Filters = () => {
  const { meta, params } = useLoaderData();

  return (
    <Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
      {/* search name */}
      <TextInput
        type="search"
        label="search product"
        name="search"
        size="input-sm"
        defaultValue={params?.search}
      />

      {/* categories */}
      <SelectInput
        label="select category"
        name="category"
        list={meta.categories}
        size="select-sm"
        defaultValue={params?.category}
      />

      {/* companies */}
      <SelectInput
        label="select company"
        name="company"
        list={meta.companies}
        size="select-sm"
        defaultValue={params?.company}
      />

      {/* order */}
      <SelectInput
        label="sort by"
        name="order"
        list={["a-z", "z-a", "high", "low"]}
        size="select-sm"
        defaultValue={params?.order}
      />

      {/* price */}

      <RangeInput label="select price" name="price" size="range-sm" defaultValue={params?.price}/>

      {/* shipping */}
      <CheckboxInput label="free shipping" name="shipping" size="checkbox-sm" defaultValue={params?.shipping}/>

      {/* buttons */}
      <button type="submit" className="btn btn-primary btn-sm capitalize">
        submit
      </button>
      <Link to="/products" className="btn btn-accent btn-sm capitalize">
        reset
      </Link>
    </Form>
  );
};

export default Filters;
