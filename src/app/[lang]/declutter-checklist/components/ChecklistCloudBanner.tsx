import GoogleSignInButton from "@/components/GoogleSignInButton";
import { useI18n } from "@/i18n/i18n-provider";

type ChecklistCloudBannerProps = {
  isLoggedIn: boolean;
  cloudStatus: "idle" | "syncing" | "saved" | "error";
};

export default function ChecklistCloudBanner({
  isLoggedIn,
  cloudStatus,
}: ChecklistCloudBannerProps) {
  const { t } = useI18n();

  if (isLoggedIn) {
    return (
      <section className="rounded-[1.75rem] bg-[#dcebdd] p-5 text-[#1f5a41] shadow-sm md:p-6">
        <p className="text-[11px] font-black uppercase tracking-[0.22em]">
          {t("checklist.cloudBackup")}
        </p>
        <h3 className="mt-2 text-xl font-black tracking-[-0.04em] text-[#002d1c]">
          {t("checklist.cloudTiedToAccount")}
        </h3>
        <p className="mt-2 text-sm text-[#335748]">
          {cloudStatus === "syncing"
            ? t("checklist.cloudSyncing")
            : cloudStatus === "error"
              ? t("checklist.cloudError")
              : t("checklist.cloudSaved")}
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-[1.75rem] bg-[#fff4df] p-5 shadow-sm md:p-6">
      <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#94652a]">
        {t("checklist.secureProgress")}
      </p>
      <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="text-xl font-black tracking-[-0.04em] text-[#573611]">
            {t("checklist.loginCloudTitle")}
          </h3>
          <p className="mt-2 text-sm text-[#7a5228]">
            {t("checklist.loginCloudDesc")}
          </p>
        </div>
        <GoogleSignInButton
          nextPath="/declutter-checklist"
          className="w-full border-[#e4c79e] text-[#573611] lg:w-auto"
          label={t("auth.continueWithGoogle")}
        />
      </div>
    </section>
  );
}
