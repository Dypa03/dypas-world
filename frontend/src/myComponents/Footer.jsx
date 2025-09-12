import githubLogo from "../assets/github-logo.png"

export default function Footer() {
    return (
        <footer className="w-full h-16 bg-main-black text-n-white p-6">
          <div className="divider h-0.5 bg-gray-700 mx-auto"></div>

          <div className="footer-text text-base flex items-center justify-between ">
            <p className="">© 2025 Deez Nuts. All rights reserved.</p>
            <div className="flex items-center">
              <p className="inline">If you want to see unfinished projects, here's my Github</p>
              <a href="https://github.com/Dypa03" target="_blank_">
              <img className="w-6 ml-1 inline"
              src={githubLogo} alt="github" />
              </a>
            </div>
          </div>

        </footer>
    )
}