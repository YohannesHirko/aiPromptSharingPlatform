"use client";
import Image from "next/image";
import Link from "next/link";
import { signOut, getProviders, signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
function Nav() {
    const { data: session } = useSession();
    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);

    useEffect(() => {
        const setupProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        };
        setupProviders();
    }, []);

    return (
        <nav className="flex-between w-full mb-16 pt-3">
            <Link href={"/"} className="flex gap-2 flex-center">
                <Image
                    width={30}
                    height={30}
                    src={"/assets/images/logo.svg"}
                    alt="Promptopia Logo"
                    className="object-contain"
                />
                <p className="logo_text">Promptopia</p>
            </Link>
            {/* Desktop Navigation */}
            <div className="sm:flex hidden">
                {session?.user ? (
                    <div className=" flex gap-3 md:gap-5">
                        <Link href={"/create-prompt"} className="black_btn">
                            Create Post
                        </Link>
                        <button
                            type="button"
                            onClick={signOut}
                            className="outline_btn"
                        >
                            Sign Out
                        </button>
                        <Link href={"/profile"}>
                            <Image
                                width={37}
                                height={37}
                                src={session?.user.image}
                                className="rounded-full"
                                alt="profile"
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type="button"
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className="black_btn"
                                >
                                    Sign in
                                </button>
                            ))}
                    </>
                )}
            </div>

            {/* Mobile Navigation */}
            <div className="sm:hidden flex relative">
                {session?.user ? (
                    <div className="flex">
                        <Image
                            width={37}
                            height={37}
                            src={session?.user.image}
                            className="rounded-full"
                            alt="profile"
                            onClick={() => {
                                setToggleDropdown((prev) => !prev);
                            }}
                        />
                        {toggleDropdown && (
                            <div className="dropdown">
                                <Link
                                    href={"/profile"}
                                    className="dropdown_list"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    My Profile
                                </Link>
                                <Link
                                    href={"/create-prompt"}
                                    className="dropdown_list"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Create Prompt
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setToggleDropdown(false);
                                        signOut();
                                    }}
                                    className="mt-5 w-full black_btn"
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type="button"
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className="black_btn"
                                >
                                    Sign in
                                </button>
                            ))}
                    </>
                )}
            </div>
        </nav>
    );
}

export default Nav;
