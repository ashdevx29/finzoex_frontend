import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Landing_header from "../Component/Newcomponent/Landing_header";

import apiService from "../core/service/detail";
import { getMethod } from "../core/service/common.api";

import bgImage from "../img/auth/signin.png";

function PrivacyPolicy() {
  const navigate = useNavigate();

  const [siteData, setSiteData] = useState({});

  useEffect(() => {
    getSiteDetails();
  }, []);

  const navbar = (value) => {
    navigate(value);
  };

  const getSiteDetails = async () => {
    try {
      const data = {
        apiUrl: apiService.getSiteDatas,
      };

      const resp = await getMethod(data);

      if (resp.status === true) {
        setSiteData(resp.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-black font-[Inter]">
      
      {/* Background */}
      <div
        className="absolute inset-0 bg-contain bg-top bg-no-repeat opacity-20"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      />

   

      {/* Header */}
      <div className="relative z-20">
        <Landing_header />
      </div>

      {/* Content */}
      <div className="relative z-10 px-3 md:px-6 py-6 md:py-16">
        <div className="max-w-7xl mx-auto">

          {/* Card */}
          <div className="rounded-xl md:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl p-6 lg:p-10">

            {/* Heading */}
            <div className="mb-6 md:mb-10 text-center">
              <h1 className="text-white text-3xl md:text-5xl font-semibold leading-[1.2] tracking-tight">
                Privacy Policy
              </h1>

              <p className="text-[#A0A0A0] mt-2 md:mt-4 text-sm md:text-base">
                Last updated: 26 July 2022
              </p>
            </div>

            {/* Content */}
            <div className="space-y-8 text-[#D2D2D2] leading-8 text-sm md:text-[15px]">

              {/* Intro */}
              <section>
                <p>
                  The categories of personal information we collect depend on
                  whether you are a customer, user, applicant or visitor, and
                  the requirements of applicable law.
                </p>
              </section>

              {/* Section */}
              <section>
                <h2 className="text-white text-xl md:text-2xl font-semibold mb-4">
                  1.1 Information You Provide to Us
                </h2>

                <div className="space-y-5">
                  <div>
                    <h3 className="text-[#00D4FF] font-medium mb-2">
                      i) Account Creation
                    </h3>

                    <p>
                      When you create a user account after you have started
                      using the Services, we may collect your name, email
                      address, date of birth, tax number, username, password or
                      other personal information used to identify you.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[#00D4FF] font-medium mb-2">
                      ii) Your Communications with Us
                    </h3>

                    <p>
                      We collect personal information from you such as email
                      address, phone number, or mailing address when you request
                      information about our Services or contact support.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[#00D4FF] font-medium mb-2">
                      iii) Social Media Content
                    </h3>

                    <p>
                      We may offer forums, blogs, or social media pages. Any
                      content you provide on these channels will be considered
                      public and is not subject to privacy protections.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section */}
              <section>
                <h2 className="text-white text-xl md:text-2xl font-semibold mb-4">
                  1.2 Information Collected Automatically
                </h2>

                <p>
                  We may collect certain information automatically when you use
                  the Services including IP address, browser type, operating
                  system, cookies, device identifiers, location data and user
                  activity.
                </p>
              </section>

              {/* Section */}
              <section>
                <h2 className="text-white text-xl md:text-2xl font-semibold mb-4">
                  II. How We Use Your Information
                </h2>

                <ul className="list-disc pl-6 space-y-3">
                  <li>Managing your information and accounts</li>
                  <li>Providing access to platform features</li>
                  <li>Communicating regarding your account</li>
                  <li>Processing transactions and payments</li>
                  <li>Improving platform security and performance</li>
                  <li>Providing marketing and analytics services</li>
                  <li>Preventing fraud and illegal activities</li>
                </ul>
              </section>

              {/* Section */}
              <section>
                <h2 className="text-white text-xl md:text-2xl font-semibold mb-4">
                  III. Disclosing Your Information
                </h2>

                <p>
                  We may share your information with service providers,
                  affiliates, payment processors and business partners as
                  necessary to operate and improve our services.
                </p>
              </section>

              {/* Section */}
              <section>
                <h2 className="text-white text-xl md:text-2xl font-semibold mb-4">
                  IV. Your Privacy Rights
                </h2>

                <ul className="list-disc pl-6 space-y-3">
                  <li>Access your personal data</li>
                  <li>Request corrections</li>
                  <li>Request deletion of your data</li>
                  <li>Restrict or object to processing</li>
                  <li>Withdraw consent anytime</li>
                </ul>
              </section>

              {/* Section */}
              <section>
                <h2 className="text-white text-xl md:text-2xl font-semibold mb-4">
                  V. Security of Your Information
                </h2>

                <p>
                  We take reasonable measures to protect your personal
                  information, but no system is completely secure.
                </p>
              </section>

              {/* Section */}
              <section>
                <h2 className="text-white text-xl md:text-2xl font-semibold mb-4">
                  VI. Contact Us
                </h2>

                <p>
                  If you have questions regarding this Privacy Policy, contact
                  us at:
                </p>

                <a
                  href="mailto:no-reply@FinzoX.com"
                  className="text-[#00D4FF] hover:underline mt-2 inline-block"
                >
                  no-reply@FinzoX.com
                </a>
              </section>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;