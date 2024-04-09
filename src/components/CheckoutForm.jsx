import React from "react";
import { Form} from "react-router-dom";
import { TextInput, SubmitBtn } from "./index";

const CheckoutForm = () => {
  return (
    <Form method="POST" className="flex flex-col gap-y-4">
      <h4 className="font-medium text-xl">Shipping Information</h4>
      <TextInput label="first name" name="name" type="text" />
      <TextInput label="address" name="address" type="text" />
      <div className="mt-4">
        <SubmitBtn text="Place Your Order" />
      </div>
    </Form>
  );
};

export default CheckoutForm;
