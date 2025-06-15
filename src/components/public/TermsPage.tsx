export default function TermsPage() {
   return (
     <div className="container mx-auto max-w-4xl px-4 py-16">
       <h1 className="mb-8 text-3xl font-bold">Terms of Service</h1>

       <div className="space-y-6">
         <section>
           <h2 className="mb-4 text-2xl font-semibold">Definitions</h2>
           <p className="text-muted-foreground">
             &quot;Service&quot; refers to the SaaS coaching platform provided
             by upCoach.
           </p>
           <p className="text-muted-foreground mt-2">
             &quot;Client&quot; means the business or organization subscribing
             to the Service.
           </p>
           <p className="text-muted-foreground mt-2">
             &quot;End User&quot; refers to the individual users of the
             platform, including children.
           </p>
           <p className="text-muted-foreground mt-2">
             &quot;Children&apos;s Data&quot; means personal data relating to
             individuals under the age of 16 (or as defined by applicable law).
           </p>
         </section>

         <section>
           <h2 className="mb-4 text-2xl font-semibold">Use of Service</h2>
           <p className="text-muted-foreground">
             Clients may use the Service only for lawful purposes and in
             compliance with these Terms. Clients agree not to:
           </p>
           <ul className="text-muted-foreground mt-2 ml-6 list-disc">
             <li>
               Upload or share any content that is harmful, offensive, or
               unlawful
             </li>
             <li>Use the Service to exploit or harm minors</li>
             <li>Bypass or attempt to bypass any security measures</li>
           </ul>
         </section>

         <section>
           <h2 className="mb-4 text-2xl font-semibold">
             Data Ownership and Responsibility
           </h2>
           <p className="text-muted-foreground">
             Clients retain ownership of all End User data submitted to the
             platform. upCoach acts as a data processor and processes personal
             data only on behalf of the Client. The Client is responsible for
             obtaining all necessary parental or guardian consents for the
             collection and use of Children&apos;s Data.
           </p>
         </section>

         <section>
           <h2 className="mb-4 text-2xl font-semibold">Children&apos;s Data</h2>
           <p className="text-muted-foreground">
             Where Children&apos;s Data is processed, the Client warrants that
             it has obtained appropriate parental/guardian consent in accordance
             with applicable laws such as COPPA (USA), GDPR (EU), and the
             Privacy Act (Australia). upCoach does not knowingly collect
             Children&apos;s Data without such consent.
           </p>
         </section>

         <section>
           <h2 className="mb-4 text-2xl font-semibold">Compliance With Laws</h2>
           <p className="text-muted-foreground">
             Both parties agree to comply with all applicable laws regarding
             privacy, data protection, and the use of Children&apos;s Data.
           </p>
         </section>

         <section>
           <h2 className="mb-4 text-2xl font-semibold">Data Security</h2>
           <p className="text-muted-foreground">
             We implement industry-standard security measures, including
             encryption and access control, to protect data. In the event of a
             data breach, we will notify Clients as required by law.
           </p>
         </section>

         <section>
           <h2 className="mb-4 text-2xl font-semibold">
             YouTube and Third-Party Videos
           </h2>
           <p className="text-muted-foreground">
             Our platform may display video content via embedded third-party
             services such as YouTube. upCoach does not host these videos and
             cannot guarantee their content. We rely on YouTube&apos;s content
             moderation policies but will make best efforts to prevent explicit
             or inappropriate content from being accessible through our
             platform.
           </p>
         </section>

         <section>
           <h2 className="mb-4 text-2xl font-semibold">
             Limitation of Liability
           </h2>
           <p className="text-muted-foreground">
             upCoach shall not be liable for any indirect, incidental, special,
             or consequential damages. Liability for direct damages shall be
             limited to the amount paid by the Client in the preceding 12
             months.
           </p>
         </section>

         <section>
           <h2 className="mb-4 text-2xl font-semibold">Indemnification</h2>
           <p className="text-muted-foreground">
             The Client agrees to indemnify and hold harmless upCoach from any
             claims, damages, or losses arising from their breach of these Terms
             or applicable data protection laws.
           </p>
         </section>

         <section>
           <h2 className="mb-4 text-2xl font-semibold">Termination</h2>
           <p className="text-muted-foreground">
             Either party may terminate the agreement with 30 days&apos; written
             notice. Upon termination, Client data will be deleted after a
             retention period of 30 days unless otherwise requested.
           </p>
         </section>

         <section>
           <h2 className="mb-4 text-2xl font-semibold">Changes to Terms</h2>
           <p className="text-muted-foreground">
             We may modify these Terms at any time. Clients will be notified of
             material changes.
           </p>
         </section>

         <section>
           <h2 className="mb-4 text-2xl font-semibold">Contact Us</h2>
           <p className="text-muted-foreground">
             If you have any questions about these Terms of Service, please
             contact us at:
           </p>
           <div className="bg-muted mt-4 rounded-lg p-4">
             <p className="text-muted-foreground">
               Email: contact.upcoach@gmail.com
               <br />
               Location: Australia
             </p>
           </div>
         </section>
       </div>
     </div>
   );
}