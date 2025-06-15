export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-8 text-3xl font-bold">Privacy Policy</h1>

      <div className="space-y-6">
        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            Information We Collect
          </h2>
          <p className="text-muted-foreground">
            We collect and store information necessary for user authentication
            and profile creation, including:
          </p>
          <ul className="text-muted-foreground mt-2 ml-6 list-disc">
            <li>Email address</li>
            <li>Name and basic profile information</li>
            <li>Authentication data</li>
            <li>User preferences and settings</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            Information About Minors
          </h2>
          <p className="text-muted-foreground">
            Our platform may store and display information about minors who are
            using our coaching services. We require explicit parental consent
            before collecting or displaying any personally identifiable
            information (PII) of children under the age of 18.
          </p>
          <p className="text-muted-foreground mt-4">
            If you believe that your child&apos;s information has been displayed
            without proper consent, please contact us immediately using the
            information below:
          </p>
          <div className="bg-muted mt-4 rounded-lg p-4">
            <p className="text-muted-foreground">
              Email: contact.upcoach@gmail.com
              <br />
              Location: Australia
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Data Security</h2>
          <p className="text-muted-foreground">
            We implement appropriate security measures to protect your personal
            information. However, no method of transmission over the internet or
            electronic storage is 100% secure, and we cannot guarantee absolute
            security.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Contact Us</h2>
          <p className="text-muted-foreground">
            If you have any questions about this Privacy Policy or our data
            practices, please contact us at:
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
