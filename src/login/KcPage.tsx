import { Suspense, lazy, useState } from "react";
import type { ClassKey } from "keycloakify/login";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/login/DefaultPage";
import Template from "keycloakify/login/Template";
import styles from "./KcPage.module.css"
const UserProfileFormFields = lazy(
    () => import("keycloakify/login/UserProfileFormFields")
);

const doMakeUserConfirmPassword = true;

export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;
    const [showCrawl, setShowCrawl] = useState(false);
    const { i18n } = useI18n({ kcContext });

    return (
        <Suspense>
            {(() => {
                switch (kcContext.pageId) {
                    default:
                        return (
                            <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
                            <div style={{
                                backgroundColor: "rgb(253,208,8)",
                                color: "black",
                                textAlign: "center",
                                height: "5%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}>
                                <span onClick={() => setShowCrawl(true)}>⚠</span> This system is dedicated for Galileo restricted usage.
                                Unauthorized user connection is forbidden.
                                All attempts are logged and lead to an investigation.
                            </div>
                            <DefaultPage
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={Template}
                                doUseDefaultCss={true}
                                UserProfileFormFields={UserProfileFormFields}
                                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                            />
                            {showCrawl && (
                                <>
                                <div className={styles.fade} onClick={() => setShowCrawl(false)}></div>
                                <section className={styles["star-wars"]} onClick={() => setShowCrawl(false)}>
                                    <div className={styles.crawl}>
                                    <div className="title">
                                        <p>Episode IV</p>
                                        <h1>A New Hope</h1>
                                    </div>
                                    <p>
                                        It is a period of civil war. Rebel spaceships, striking from a
                                        hidden base, have won their first victory against the evil
                                        Galactic Empire.
                                    </p>
                                    <p>
                                        During the battle, Rebel spies managed to steal secret plans to
                                        the Empire’s ultimate weapon, the DEATH STAR, an armored space
                                        station with enough power to destroy an entire planet.
                                    </p>
                                    <p>
                                        Pursued by the Empire’s sinister agents, Princess Leia races
                                        home aboard her starship, custodian of the stolen plans that can
                                        save her people and restore freedom to the galaxy….
                                    </p>
                                    </div>
                                </section>
                                </>
      )}
                            </div>
                        );
                }
            })()}
        </Suspense>
    );
}

const classes = {} satisfies { [key in ClassKey]?: string };
