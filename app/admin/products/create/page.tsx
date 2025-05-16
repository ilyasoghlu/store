import React from "react";

import { Button } from "@/components/ui/button";
import { faker } from "@faker-js/faker";
import FormInput from "@/components/form/FormInput";
import PriceInput from "@/components/form/PriceInput";
import ImageInput from "@/components/form/ImageInput";
import TextArea from "@/components/form/TextArea";

const createProductAction = async (formData: FormData) => {
    "use server";
    const name = formData.get("name") as string;
    console.log(name);
    };

function CreateProductPage() {
    const name = faker.commerce.productName();
    const company = faker.company.name();
    const description = faker.lorem.paragraph({ min: 10, max: 12 });
    return (
        <section>
        <h1 className="text-2xl font-semibold mb-8 capitalize">create product</h1>
        <div className="border p-8 rounded-md">
            <form action={createProductAction}>
                <FormInput
                    type="text"
                    name="name"
                    label="product name"
                    defaultValue={name}
                />
                <FormInput
                    type="text"
                    name="name"
                    label="company"
                    defaultValue={company}
                />
                <PriceInput />
                <ImageInput />
                <TextArea
                    type="text"
                    name="name"
                    label="product description"
                    defaultValue={description}
                />
                <Button
                    type="submit"
                    size="lg"
                    className="bg-cyan-600 text-white"
                >
                    Submit
                </Button>
            </form>
        </div>
        </section>
    );
}

export default CreateProductPage;
