import React, { createContext, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import supabase from "./supabaseClient";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get("access_token");

      if (token) {
        const { data, error } = await supabase.auth.getUser();
        if (data?.user) {
          setUser(data.user);
        } else {
          Cookies.remove("access_token");
          setUser(null);
        }
      }
    };

    fetchUser();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN") {
          setUser(session?.user);
          Cookies.set("access_token", session.access_token, { secure: true, expires: 7 });
        } else if (event === "SIGNED_OUT") {
          setUser(null);
          Cookies.remove("access_token");
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};



// import React, { createContext, useState, useEffect, useContext } from "react";
// import Cookies from "js-cookie";
// import supabase from "./supabaseClient";

// export const AuthContext = createContext();

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       const { data, error } = await supabase.auth.getUser();
//       if (data?.user) {
//         setUser(data.user);

//         // Save the access token in cookies (if it doesn't exist)
//         if (data.session?.access_token) {
//           Cookies.set("access_token", data.session.access_token, { secure: true, expires: 7 });
//         }
//       }
//     };

//     fetchUser();

//     // Listen for auth state changes
//     const { data: authListener } = supabase.auth.onAuthStateChange(
//       async (event, session) => {
//         if (event === "SIGNED_IN") {
//           setUser(session?.user);

//           // Save access token in cookies
//           if (session?.access_token) {
//             Cookies.set("access_token", session.access_token, { secure: true, expires: 7 });
//           }
//         } else if (event === "SIGNED_OUT") {
//           setUser(null);

//           // Remove the token from cookies
//           Cookies.remove("access_token");
//         }
//       }
//     );

//     return () => {
//       authListener.subscription.unsubscribe();
//     };
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, setUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

