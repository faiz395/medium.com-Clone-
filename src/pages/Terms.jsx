import React from "react";

function Terms() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black p-6">
      <div className="max-w-4xl my-12 md:my-24 text-left">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Terms and Conditions
        </h1>
        <p className="text-xl md:text-2xl leading-relaxed mb-8">
          Welcome to our website. By continuing to browse and use this website, you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern [Your Company Name]’s relationship with you in relation to this website.
        </p>

        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          Use of the Website
        </h2>
        <p className="text-xl md:text-2xl leading-relaxed mb-8">
          The content of the pages of this website is for your general information and use only. It is subject to change without notice.
        </p>

        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          Intellectual Property
        </h2>
        <p className="text-xl md:text-2xl leading-relaxed mb-8">
          This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance, and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.
        </p>

        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          Limitation of Liability
        </h2>
        <p className="text-xl md:text-2xl leading-relaxed mb-8">
          Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services, or information available through this website meet your specific requirements.
        </p>

        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          Governing Law
        </h2>
        <p className="text-xl md:text-2xl leading-relaxed mb-8">
          These terms and conditions are governed by and construed in accordance with the laws of [Your Country], and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
        </p>
      </div>
    </div>
  );
}

export default Terms;
