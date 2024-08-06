import Stripe from "stripe";

import { currentUser } from "@clerk/nextjs";
import { Courses } from "@/models/Courses";
import { stripe } from "@/lib/stripe";

export async function POST(request, { params }) {
  try {
    const user = await currentUser();

    if (!user || !user.id || !user?.emailAddresses[0]?.emailAddress) {
      return NextResponse.json({ message: "unauthorized" }, { status: 401 });
    }

    const course = await Courses.find({
      _id: params.courseId,
      isPublished: true,
    });
    if (!course) {
      return NextResponse.json("Not found course", { status: 404 });
    }

    // TODO - user already have a purchase return already purchase

    // const purchase = set actual Method
    // if (!purchase) {
    //   return NextResponse.json("Already purchase", { status: 400 });
    // }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency: "USD",
          product_data: {
            name: course.title,
            description: course.description,
          },
          unit_amount: Math.round(course.price * 100),
        },
      },
    ];

    let stripCustomer = await StripCustomer.create({
      userId: user.id,
      stripCustomerId: true,
    }); // TODO

    if (!stripCustomer) {
      const customer = await stripe.customers.create({
        email: user.emailAddresses[0]?.emailAddress,
      });
    }

    // then save stripCustomer

    stripCustomer = await StripCustomer.create({
      userId: user.id,
      stripCustomerId: customer.id,
    }); // TODO

    const session = await stripe.checkout.sessions.create({
      customer: stripCustomer.StripCustomerId,
      line_items,
    });

    return NextResponse.json(NewCourseAttachment, { status: 201 });
  } catch (error) {
    console.error("Error Course checkout:", error);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}
