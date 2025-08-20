import githubLogo from "../assets/github-logo.png"

export default function Footer() {
    return (
        <footer className="w-full h-28 bg-footer-black text-n-white p-10">
          <div className="divider h-0.5 bg-gray-700 w-3/4 mx-auto"></div>

          <div className="footer-text flex items-center justify-between px-60">
            <p className="text-lg">© 2025 Deez Nuts. All rights reserved.</p>
            <div className="flex items-center">
              <p className="inline">If you want to see unfinished projects, here's my Github</p>
              <a href="https://github.com/Dypa03" target="_blank_">
              <img className="w-10 ml-2 inline"
              src={githubLogo} alt="github" />
              </a>
            </div>
          </div>

        </footer>
    )
}