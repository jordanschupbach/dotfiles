;;; package --- summary
;;; Commentary:
;;; Code:
(require 'package)
(mapc (lambda(p) (push p package-archives))
      '(("melpa" . "http://melpa.milkbox.net/packages/")
	("org" . "https://orgmode.org/elpa/")))

;; ("marmalade" . "http://marmalade-repo.org/packages/") ;; In case you want to check out marmalade packages

(package-initialize)
(package-refresh-contents)
(custom-set-variables
 ;; custom-set-variables was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 '(package-selected-packages
   (quote
    (origami ranger elfeed-goodies elfeed-org elfeed folding auto-complete flycheck org ess evil-collection evil use-package))))
(custom-set-faces
 ;; custom-set-faces was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 )
;; This is only needed once, near the top of the file
(eval-when-compile
  ;; Following line is not needed if use-package.el is in ~/.emacs.d
  ;; (add-to-list 'load-path "<path where use-package is installed>")
  (require 'use-package))

(use-package org)
(org-babel-load-file "~/.emacs.d/config.org")
