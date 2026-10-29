import { useState } from "react";
import { useCustomer } from "@/context/CustomerContext";
import { useLocale } from "@/i18n/LocaleContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { UserRound } from "lucide-react";

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LoginDialog = ({ open, onOpenChange }: LoginDialogProps) => {
  const { t } = useLocale();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const { login, register } = useCustomer();

  const reset = () => {
    setError("");
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setBusy(false);
  };

  const handleClose = (openState: boolean) => {
    if (!openState) reset();
    onOpenChange(openState);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError(t("login.enterBoth"));
      return;
    }
    setBusy(true);
    const res = await login(email, password).catch(() => ({ ok: false, message: t("common.somethingWrong") }));
    setBusy(false);
    if (!res.ok) {
      setError(res.message || t("login.incorrect"));
      return;
    }
    handleClose(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!firstName || !lastName || !email || !password) {
      setError(t("login.fillAll"));
      return;
    }
    if (password.length < 5) {
      setError(t("login.passwordMin"));
      return;
    }
    setBusy(true);
    const res = await register({ firstName, lastName, email, password }).catch(() => ({
      ok: false,
      message: t("common.somethingWrong"),
    }));
    setBusy(false);
    if (!res.ok) {
      setError(res.message || t("login.couldNotCreate"));
      return;
    }
    handleClose(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserRound className="w-5 h-5" />
            {t("header.yourAccountTitle")}
          </DialogTitle>
          <DialogDescription>
            {t("login.description")}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="signin" onValueChange={() => setError("")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">{t("login.signIn")}</TabsTrigger>
            <TabsTrigger value="register">{t("login.createAccount")}</TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            <form onSubmit={handleSignIn} className="space-y-4 pt-2">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <Label htmlFor="signin-email">{t("login.email")}</Label>
                <Input
                  id="signin-email"
                  type="text"
                  autoComplete="email"
                  placeholder={t("login.emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signin-password">{t("login.password")}</Label>
                <Input
                  id="signin-password"
                  type="password"
                  autoComplete="current-password"
                  placeholder={t("login.passwordPlaceholder")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" disabled={busy} className="w-full bg-brand hover:bg-brand-hover">
                {busy ? t("login.signingIn") : t("login.signIn")}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4 pt-2">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="reg-first">{t("login.firstName")}</Label>
                  <Input
                    id="reg-first"
                    autoComplete="given-name"
                    placeholder={t("login.firstName")}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-last">{t("login.lastName")}</Label>
                  <Input
                    id="reg-last"
                    autoComplete="family-name"
                    placeholder={t("login.lastName")}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-email">{t("login.email")}</Label>
                <Input
                  id="reg-email"
                  type="email"
                  autoComplete="email"
                  placeholder={t("login.emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-password">{t("login.password")}</Label>
                <Input
                  id="reg-password"
                  type="password"
                  autoComplete="new-password"
                  placeholder={t("login.passwordHint")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" disabled={busy} className="w-full bg-brand hover:bg-brand-hover">
                {busy ? t("login.creating") : t("login.createAccount")}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
