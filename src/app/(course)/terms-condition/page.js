import React from "react";

import { Separator } from "@/components/ui/separator";

const TermsConditionPage = () => {
  return (
    <div className="font">
      <h1 className=" font-extrabold text-2xl text-center p-4">
        Terms and Conditions for Squad Ring ( LMS )
      </h1>

      <Separator />

      <div className="p-8 flex flex-col space-y-10">
        <div className="flex flex-col gap-y-4">
          <h1 className="font-[600] text-3xl">Terms and Conditions</h1>
          <p>Last updated: July 31, 2024</p>
          <p>
            Please read these terms and conditions carefully before using Our
            Service.
          </p>
        </div>

        <div className="flex flex-col space-y-4">
          <h1 className="font-[600] text-3xl">
            Interpretation and Definitions
          </h1>

          <h1 className="text-2xl my-8"> Interpretation</h1>
          <p>
            The words of which the initial letter is capitalized have meanings
            defined under the following conditions. The following definitions
            shall have the same meaning regardless of whether they appear in
            singular or in plural.
          </p>

          <h1 className="text-2xl my-8"> Definitions</h1>
          <p>For the purposes of these Terms and Conditions:</p>
          <div className="flex flex-col gap-y-4">
            <p>
              <span className="font-[600]">1. Affiliate</span> means an entity
              that controls, is controlled by or is under common control with a
              party, where &ldquo;control&rdquo; means ownership of 50% or more
              of the shares, equity interest or other securities entitled to
              vote for election of directors or other managing authority.
            </p>
            <p>
              <span className="font-[600]">2. Account</span> means a unique
              account created for You to access our Service or parts of our
              Service.
            </p>
            <p>
              <span className="font-[600]">3. Country</span> refers to:
              Bangladesh.
            </p>
            <p>
              <span className="font-[600]">4. Content</span> refers to content
              such as text, images, or other information that can be posted,
              uploaded, linked to or otherwise made available by You, regardless
              of the form of that content.
            </p>
            <p>
              <span className="font-[600]">5. Device</span> means any device
              that can access the Service such as a computer, a cellphone or a
              digital tablet.
            </p>
            <p>
              <span className="font-[600]">6. Feedback</span> means feedback,
              innovations or suggestions sent by You regarding the attributes,
              performance or features of our Service.
            </p>
            <p>
              <span className="font-[600]">7. Goods</span> Goods refer to the
              items offered for sale on the Service.
            </p>
            <p>
              <span className="font-[600]">8. Orders</span> mean a request by
              You to purchase Goods from Us.
            </p>
            <p>
              <span className="font-[600]">9. Terms and Conditions</span> mean
              these Terms and Conditions that form the entire agreement between
              You and the Company regarding the use of the Service.
            </p>
            <p>
              <span className="font-[600]">
                10. Third-party Social Media Service
              </span>{" "}
              means any services or content (including data, information,
              products or services) provided by a third-party that may be
              displayed, included or made available by the Service.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-y-4">
          <h1 className="font-[600] text-3xl">Acknowledgment</h1>
          <p>
            These are the Terms and Conditions governing the use of this Service
            and the agreement that operates between You and the Company. These
            Terms and Conditions set out the rights and obligations of all users
            regarding the use of the Service.
          </p>
          <p>
            Your access to and use of the Service is conditioned on Your
            acceptance of and compliance with these Terms and Conditions. These
            Terms and Conditions apply to all visitors, users and others who
            access or use the Service.
          </p>
          <p>
            By accessing or using the Service You agree to be bound by these
            Terms and Conditions. If You disagree with any part of these Terms
            and Conditions then You may not access the Service.
          </p>
          <p>
            You represent that you are over the age of 18. The Company does not
            permit those under 18 to use the Service.
          </p>
          <p>
            Your access to and use of the Service is also conditioned on Your
            acceptance of and compliance with the Privacy Policy of the Company.
            Our Privacy Policy describes Our policies and procedures on the
            collection, use and disclosure of Your personal information when You
            use the Application or the Website and tells You about Your privacy
            rights and how the law protects You. Please read Our Privacy Policy
            carefully before using Our Service.
          </p>
        </div>

        <div className="flex flex-col gap-y-4">
          <h1 className="font-[600] text-3xl">Your Feedback to Us</h1>
          <p>
            You assign all rights, title and interest in any Feedback You
            provide the Company. If for any reason such assignment is
            ineffective, You agree to grant the Company a non-exclusive,
            perpetual, irrevocable, royalty free, worldwide right and license to
            use, reproduce, disclose, sub-license, distribute, modify and
            exploit such Feedback without restriction.
          </p>
        </div>

        <div className="flex flex-col gap-y-4">
          <h1 className="font-[600] text-3xl">Copyright Policy</h1>
          <p>
            We respect the intellectual property rights of others. It is Our
            policy to respond to any claim that Content posted on the Service
            infringes a copyright or other intellectual property infringement of
            any person. If You are a copyright owner, or authorized on behalf of
            one, and You believe that the copyrighted work has been copied in a
            way that constitutes copyright infringement that is taking place
            through the Service, You must submit Your notice in writing to the
            attention of our copyright agent via email at
            business@codewithantonio.com and include in Your notice a detailed
            description of the alleged infringement. You may be held accountable
            for damages for misrepresenting that any Content is infringing Your
            copyright.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsConditionPage;
