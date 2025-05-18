import React from "react";

import { faker } from "@faker-js/faker";
import FormInput from "@/components/form/FormInput";
import PriceInput from "@/components/form/PriceInput";
import ImageInput from "@/components/form/ImageInput";
import TextArea from "@/components/form/TextArea";
import FormContainer from "@/components/form/FormContainer";
import { createProductAction } from "@/utils/actions";
import CheckboxInput from "@/components/form/CheckboxInput";
import { SubmitButton } from "@/components/form/Button";


function CreateProductPage() {
    const name = faker.commerce.productName();
    const company = faker.company.name();
    const description = faker.lorem.paragraph({ min: 10, max: 12 });
    return (
        <section>
        <h1 className="text-2xl font-semibold mb-8 capitalize">create product</h1>
        <div className="border p-8 rounded-md">
            <FormContainer action={createProductAction}>
                <div className="grid gap-4 md:grid-cols-2 my-4">
                    <FormInput type="text" name='name' label="product name" defaultValue={name} />
                    <FormInput type="text" name="company" label="comapny" defaultValue={company} />
                    <PriceInput />
                    <ImageInput />
                </div>
                <TextArea  name="description" labelText='product description' defaultValue={description} />
                <div className="my-6">
                    <CheckboxInput name="featured" label="featured" />
                </div>
                <SubmitButton text="create product" className="mt-8 bg-orange-500 hover:bg-orange-400 text-white" />
            </FormContainer>
        </div>
        </section>
    );
}

export default CreateProductPage;
