require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "RNShare"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.author       = { package["author"]["name"] => package["author"]["email"] }
  s.platform     = :ios, "8.0"
  s.source       = { :git => "https://github.com/react-native-community/react-native-share.git", :tag => "v#{s.version}" }

  s.source_files  = "ios/**/*.{h,m,mm}"

  # Opt out of Instagram sharing at build time (see #1783). Apps that never
  # share to Instagram can set RN_SHARE_EXCLUDE_INSTAGRAM=1 before running
  # `pod install`; the flag is then defined for the pod target and
  # InstagramShare's PHPhotoLibrary calls are compiled out. Instagram
  # stays included by default.
  if ENV['RN_SHARE_EXCLUDE_INSTAGRAM'] == '1'
    s.compiler_flags = '-DRN_SHARE_EXCLUDE_INSTAGRAM=1'
  end

  s.ios.weak_framework = 'LinkPresentation'

  if defined?(install_modules_dependencies()) != nil
    install_modules_dependencies(s)
  else
    s.dependency "React-Core"
  end

end
