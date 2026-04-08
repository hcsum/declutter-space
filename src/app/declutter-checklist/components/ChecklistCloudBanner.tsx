import GoogleSignInButton from "@/components/GoogleSignInButton";

type ChecklistCloudBannerProps = {
  isLoggedIn: boolean;
  cloudStatus: "idle" | "syncing" | "saved" | "error";
};

export default function ChecklistCloudBanner({
  isLoggedIn,
  cloudStatus,
}: ChecklistCloudBannerProps) {
  if (isLoggedIn) {
    return (
      <section className="rounded-[1.75rem] bg-[#dcebdd] p-5 text-[#1f5a41] shadow-sm md:p-6">
        <p className="text-[11px] font-black uppercase tracking-[0.22em]">
          Cloud backup
        </p>
        <h3 className="mt-2 text-xl font-black tracking-[-0.04em] text-[#002d1c]">
          Your checklist is tied to your account.
        </h3>
        <p className="mt-2 text-sm text-[#335748]">
          {cloudStatus === "syncing"
            ? "Saving your latest checklist changes to the cloud now."
            : cloudStatus === "error"
              ? "Cloud sync hit a problem. Your local browser copy is still kept on this device."
              : "Your lists and progress are stored in the cloud and stay available after you sign back in."}
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-[1.75rem] bg-[#fff4df] p-5 shadow-sm md:p-6">
      <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#94652a]">
        Secure your progress
      </p>
      <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="text-xl font-black tracking-[-0.04em] text-[#573611]">
            Log in to keep your checklist secure in the cloud.
          </h3>
          <p className="mt-2 text-sm text-[#7a5228]">
            Without login, your lists and progress stay only in this browser.
            Sign in with Google to back them up to your account.
          </p>
        </div>
        <GoogleSignInButton
          nextPath="/declutter-checklist"
          className="w-full border-[#e4c79e] text-[#573611] lg:w-auto"
        />
      </div>
    </section>
  );
}
