import { useState } from "react";
import { useLogin, useRegister } from "@/hooks/use-auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertUserSchema } from "@shared/schema";
import { z } from "zod";

const loginSchema = z.object({
  username: z.string().min(1, "Email é obrigatório"),
  password: z.string().min(1, "Senha é obrigatória"),
});

type LoginForm = z.infer<typeof loginSchema>;
type RegisterForm = z.infer<typeof insertUserSchema>;

export default function Login() {
  const login = useLogin();
  const register = useRegister();

  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const registerForm = useForm<RegisterForm>({
    resolver: zodResolver(insertUserSchema),
    defaultValues: {
      role: "user",
    }
  });

  const onLogin = (data: LoginForm) => {
    login.mutate(data);
  };

  const onRegister = (data: RegisterForm) => {
    register.mutate(data);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-secondary/30 p-4">
      <Card className="w-full max-w-md shadow-2xl border-white/50 backdrop-blur">
        <Tabs defaultValue="login" className="w-full">
          <div className="p-6 pb-0">
            <TabsList className="grid w-full grid-cols-2 rounded-xl h-12 bg-secondary/50 p-1">
              <TabsTrigger value="login" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Login</TabsTrigger>
              <TabsTrigger value="register" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Cadastro</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="login" className="mt-0">
            <CardHeader>
              <CardTitle className="font-display text-2xl">Bem-vindo de volta!</CardTitle>
              <CardDescription>Entre na sua conta para continuar.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email / Username</Label>
                  <Input id="login-email" {...loginForm.register("username")} className="rounded-xl h-12" />
                  {loginForm.formState.errors.username && (
                    <span className="text-xs text-destructive">{loginForm.formState.errors.username.message}</span>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-pass">Senha</Label>
                  <Input id="login-pass" type="password" {...loginForm.register("password")} className="rounded-xl h-12" />
                  {loginForm.formState.errors.password && (
                    <span className="text-xs text-destructive">{loginForm.formState.errors.password.message}</span>
                  )}
                </div>
                <Button type="submit" className="w-full h-12 rounded-xl mt-2" disabled={login.isPending}>
                  {login.isPending ? "Entrando..." : "Entrar"}
                </Button>
              </form>
            </CardContent>
          </TabsContent>

          <TabsContent value="register" className="mt-0">
            <CardHeader>
              <CardTitle className="font-display text-2xl">Criar Conta</CardTitle>
              <CardDescription>Junte-se a nós e cuide melhor do seu pet.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reg-name">Nome Completo</Label>
                  <Input id="reg-name" {...registerForm.register("name")} className="rounded-xl h-12" />
                  {registerForm.formState.errors.name && (
                    <span className="text-xs text-destructive">{registerForm.formState.errors.name.message}</span>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-email">Email (Username)</Label>
                  <Input id="reg-email" {...registerForm.register("username")} className="rounded-xl h-12" />
                  {registerForm.formState.errors.username && (
                    <span className="text-xs text-destructive">{registerForm.formState.errors.username.message}</span>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-pass">Senha</Label>
                  <Input id="reg-pass" type="password" {...registerForm.register("password")} className="rounded-xl h-12" />
                  {registerForm.formState.errors.password && (
                    <span className="text-xs text-destructive">{registerForm.formState.errors.password.message}</span>
                  )}
                </div>
                <Button type="submit" className="w-full h-12 rounded-xl mt-2" disabled={register.isPending}>
                  {register.isPending ? "Criando..." : "Criar Conta"}
                </Button>
              </form>
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
