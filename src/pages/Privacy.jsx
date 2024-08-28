import React from "react";

function Privacy() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black p-6">
      <div className="max-w-4xl my-12 md:my-24 text-left">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Privacy Policy
        </h1>
        <p className="text-xl md:text-2xl leading-relaxed mb-8">
          Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
        </p>

        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          Information We Collect
        </h2>
        <p className="text-xl md:text-2xl leading-relaxed mb-8">
          We may collect information about you in a variety of ways. The information we may collect on the Site includes:
        </p>
        <ul className="list-disc list-inside text-xl md:text-2xl leading-relaxed mb-8">
          <li>Personal Data: Personally identifiable information, such as your name, shipping address, email address, and telephone number.</li>
          <li>Derivative Data: Information our servers automatically collect when you access the Site, such as your IP address, browser type, operating system, access times, and the pages you have viewed directly before and after accessing the Site.</li>
          <li>Financial Data: Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services from the Site.</li>
        </ul>

        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          Use of Your Information
        </h2>
        <p className="text-xl md:text-2xl leading-relaxed mb-8">
          We may use the information we collect from you in the following ways:
        </p>
        <ul className="list-disc list-inside text-xl md:text-2xl leading-relaxed mb-8">
          <li>To personalize your experience and to allow us to deliver the type of content and product offerings in which you are most interested.</li>
          <li>To improve our website in order to better serve you.</li>
          <li>To allow us to better service you in responding to your customer service requests.</li>
          <li>To quickly process your transactions.</li>
          <li>To send periodic emails regarding your order or other products and services.</li>
        </ul>

        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          Disclosure of Your Information
        </h2>
        <p className="text-xl md:text-2xl leading-relaxed mb-8">
          We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
        </p>
        <ul className="list-disc list-inside text-xl md:text-2xl leading-relaxed mb-8">
          <li>By Law or to Protect Rights: If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.</li>
          <li>Business Transfers: We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
          <li>Third-Party Service Providers: We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.</li>
        </ul>

        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          Security of Your Information
        </h2>
        <p className="text-xl md:text-2xl leading-relaxed mb-8">
          We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
        </p>

        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          Policy Changes
        </h2>
        <p className="text-xl md:text-2xl leading-relaxed mb-8">
          We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons.
        </p>

        <p className="text-xl md:text-2xl leading-relaxed mb-8">
          If you have any questions about this Privacy Policy, please contact us.
        </p>
      </div>
    </div>
  );
}

export default Privacy;
